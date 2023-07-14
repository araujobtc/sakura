function style(){
    document.querySelector('body').style.backgroundColor = localStorage.getItem('bgcolor')
    document.querySelectorAll('*').forEach(all => {
        all.style.fontFamily = localStorage.getItem('font')
        all.style.fontSize = localStorage.getItem('font-size')
    });
}
style()

function bg(color){
    localStorage.removeItem('bgcolor')
    localStorage.setItem('bgcolor', color)
    style()
}

function font(fonttype){
    localStorage.removeItem('font')
    localStorage.setItem('font', fonttype)
    style()
}

function fsize(size){
    localStorage.removeItem('font-size')
    localStorage.setItem('font-size', size)
    style()
}