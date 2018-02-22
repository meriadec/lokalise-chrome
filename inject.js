const cache = {}

addButtons()

window.addEventListener('scroll', addButtons)

function addButtons() {
  const all = document.querySelectorAll('.edit-key')
  ;[...all].forEach(addCopyBtnToRow)
}

function addCopyBtnToRow(a) {
  const key = a.innerHTML.trim()
  if (cache[key]) {
    return
  }
  const tbody = findAncestor(a, 'tbody')
  const actions = tbody.children[1].children[0].children[0]
  const btn = generateBtn()
  btn.addEventListener('click', () => {
    document.execCommand('copy')
  })
  btn.addEventListener('copy', copyKey(key))
  actions.appendChild(btn)
  cache[key] = true
}

function copyKey(key) {
  return e => {
    e.preventDefault()
    if (e.clipboardData) {
      e.clipboardData.setData('text/plain', key)
    } else if (window.clipboardData) {
      window.clipboardData.setData('Text', key)
    }
  }
}

function generateBtn() {
  const btn = document.createElement('a')
  btn.classList.add('key-function-button')
  btn.innerHTML = 'Copy key'
  btn.style.backgroundColor = '#4f5d73'
  btn.style.lineHeight = 0.5
  btn.style.padding = '5px'
  btn.style.borderRadius = '5px'
  btn.style.color = 'white'
  btn.style.textTransform = 'uppercase'
  btn.style.fontSize = '9px'
  return btn
}

function findAncestor(el, tag) {
  while (el.parentNode && el.tagName !== tag.toUpperCase()) {
    el = el.parentNode
  }
  return el
}
