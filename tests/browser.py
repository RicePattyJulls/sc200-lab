"""End-to-end checks against the local static server (Python Playwright)."""
from pathlib import Path
import json
from playwright.sync_api import sync_playwright, expect

URL = 'http://127.0.0.1:4173/'
OUT = Path('/tmp/sc200-browser-results')
OUT.mkdir(exist_ok=True)

def stored(page):
    return page.evaluate("JSON.parse(localStorage.getItem('sc200lab:v1'))")

def navigate(page, suffix):
    page.goto(URL + suffix)
    page.wait_for_load_state('networkidle')

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True, executable_path='/usr/bin/chromium', args=['--no-sandbox'])
    context = browser.new_context(viewport={'width':1440,'height':1000}, accept_downloads=True)
    page = context.new_page()
    errors = []
    page.on('pageerror', lambda error: errors.append(str(error)))
    navigate(page, '')
    expect(page.locator('h1')).to_contain_text('Entiende la decisión')
    page.screenshot(path=str(OUT/'desktop-home.png'), full_page=True)
    assert page.evaluate('SC.bank.length') == 500

    # A focused practice with both single and multiple answer questions.
    navigate(page, '#study/env')
    page.locator('#topic').select_option('Roles y alcance')
    page.locator('#count').select_option('10')
    page.get_by_role('button', name='Comenzar práctica').click()
    expect(page.locator('.question')).to_be_visible()
    session = stored(page)['active']
    index = session['ids'].index('env-004')
    page.locator(f'[data-action="jump"][data-index="{index}"]').click()
    page.locator('input[name=answer][value="0"]').check()
    expect(page.get_by_role('button', name='Comprobar', exact=True)).to_be_disabled()
    page.locator('input[name=answer][value="1"]').check()
    page.get_by_role('button', name='Comprobar', exact=True).click()
    expect(page.locator('.feedback')).to_contain_text('Correcto')
    page.locator('[data-action=bookmark]').click()
    page.locator('[data-action=flag]').click()
    page.reload()
    expect(page.locator('.feedback')).to_contain_text('Correcto')
    assert stored(page)['stats']['env-004']['seen'] == 1
    assert 'env-004' in stored(page)['bookmarks']
    page.screenshot(path=str(OUT/'desktop-feedback.png'), full_page=True)

    index = stored(page)['active']['ids'].index('env-001')
    page.locator(f'[data-action="jump"][data-index="{index}"]').click()
    page.locator('input[name=answer][value="1"]').check()
    page.get_by_role('button', name='Comprobar', exact=True).click()
    expect(page.locator('.feedback.wrong')).to_be_visible()
    page.get_by_role('button', name='Terminar sesión', exact=True).click()
    expect(page.get_by_role('dialog')).to_be_visible()
    page.locator('#dialog-ok').click()
    expect(page.locator('.scorebox')).to_be_visible()
    assert stored(page)['history'][0]['finished']
    assert len(stored(page)['history']) == 1
    page.locator('#only-wrong').check()
    assert page.locator('.review-item').count() == 9
    page.screenshot(path=str(OUT/'desktop-results.png'), full_page=True)

    # Export/import on a separate browser context and reject a bad backup.
    navigate(page, '#settings')
    with page.expect_download() as download:
        page.locator('[data-action=export]').click()
    backup = OUT/'backup.json'
    download.value.save_as(str(backup))
    expected_state = stored(page)
    other = browser.new_context(viewport={'width':1280,'height':900})
    second = other.new_page()
    navigate(second, '#settings')
    second.locator('#import-file').set_input_files(str(backup))
    expect(second.get_by_role('dialog')).to_be_visible()
    second.locator('#dialog-ok').click()
    expect(second.locator('h1')).to_contain_text('Entiende la decisión')
    assert stored(second) == expected_state
    navigate(second, '#settings')
    second.locator('#import-file').set_input_files({'name':'bad.json','mimeType':'application/json','buffer':b'{"version":1}'})
    expect(second.locator('#notice')).to_contain_text('no es una copia válida')
    assert stored(second) == expected_state

    # Balanced timed exam, persisted selections and deadline, no early feedback.
    navigate(page, '#home')
    page.locator('[data-action=start-exam]').click()
    expect(page.locator('#timer')).to_be_visible()
    original = stored(page)['active']
    assert len(original['ids']) == 50
    for d, n in [('env',21),('response',19),('hunt',10)]:
        assert sum(id.startswith(d+'-') for id in original['ids']) == n
    page.locator('input[name=answer]').first.check()
    expect(page.locator('.feedback')).to_have_count(0)
    after = stored(page)['active']
    page.reload()
    assert stored(page)['active']['deadline'] == original['deadline']
    assert stored(page)['active']['orders'] == original['orders']
    assert stored(page)['active']['answers'] == after['answers']
    navigate(page, '#home')
    expect(page.locator('.resume')).to_be_visible()
    page.get_by_role('link', name='Continuar sesión').click()
    expect(page.locator('.question')).to_be_visible()
    # Simulate an elapsed wall-clock deadline; refresh must finalize automatically.
    page.evaluate("const s=JSON.parse(localStorage.getItem('sc200lab:v1'));s.active.deadline=Date.now()-1;localStorage.setItem('sc200lab:v1',JSON.stringify(s));")
    page.reload()
    expect(page.locator('.scorebox')).to_be_visible()
    assert stored(page)['active']['finished']
    assert len(stored(page)['history']) == 2

    # Bank filters, pagination and direct bookmarking.
    navigate(page, '#bank')
    page.locator('#search').fill('arg_max')
    expect(page.locator('#bank-count')).not_to_contain_text('0 preguntas')
    page.locator('.bank-item summary').first.click()
    expect(page.locator('.bank-item[open] .explanation')).to_be_visible()
    page.locator('#search').fill('no-such-concept-9457')
    expect(page.locator('#bank-count')).to_contain_text('0 preguntas')
    page.locator('#search').fill('')
    page.locator('[data-action=bank-next]').click()
    expect(page.locator('#bank-count')).to_contain_text('página 2')

    # Mobile: layout and a complete short-session interaction.
    mobile = browser.new_context(viewport={'width':390,'height':844}, is_mobile=True, has_touch=True)
    phone = mobile.new_page()
    phone.on('pageerror', lambda error: errors.append(str(error)))
    navigate(phone, '#home')
    phone.screenshot(path=str(OUT/'mobile-home.png'), full_page=True)
    assert phone.evaluate('document.documentElement.scrollWidth <= innerWidth')
    navigate(phone, '#study/hunt')
    phone.locator('#count').select_option('10')
    phone.locator('[data-action=start-study]').click()
    expect(phone.locator('.question')).to_be_visible()
    assert phone.evaluate('document.documentElement.scrollWidth <= innerWidth')
    phone.screenshot(path=str(OUT/'mobile-quiz.png'), full_page=True)
    navigate(phone, '#coverage')
    assert phone.locator('.coverage-item').count() == 50
    assert phone.evaluate('document.documentElement.scrollWidth <= innerWidth')

    # Query exercises show their full code, including during review in the bank.
    navigate(page, '#bank')
    page.locator('#search').fill('hunt-063')
    page.locator('.bank-item summary').click()
    expect(page.locator('pre')).to_contain_text('MICROSOFT.SECURITYINSIGHTS/ALERTRULES/WRITE')
    page.screenshot(path=str(OUT/'desktop-kql.png'), full_page=True)

    # Storage failure is visible and does not crash the in-memory practice.
    restricted = browser.new_context()
    no_storage = restricted.new_page()
    no_storage.add_init_script("Storage.prototype.setItem = function(){throw new DOMException('disabled','SecurityError')}")
    navigate(no_storage, '#study')
    no_storage.locator('[data-action=start-study]').click()
    expect(no_storage.locator('.storage-warning')).to_be_visible()
    expect(no_storage.locator('.question')).to_be_visible()

    # Works directly from disk, without a web server.
    offline = browser.new_context()
    local = offline.new_page()
    local.goto((Path(__file__).resolve().parents[1]/'index.html').as_uri())
    local.wait_for_load_state('networkidle')
    expect(local.locator('h1')).to_contain_text('Entiende la decisión')
    assert local.evaluate('SC.bank.length') == 500

    assert not errors, errors
    browser.close()
    print('PASS: desktop, mobile, study, multi-select, scoring, exam balance, resume, timer expiry, export/import, invalid backup, bank, coverage and file://. No JS errors.')
    print('Screenshots:', OUT)
