const menu = document.querySelectorAll('.header__menu a')
if (menu) {
    menu.forEach(item => {
       // console.log(item);
        item.addEventListener('click', (e) => {
            e.preventDefault()
            const menuActive = document.querySelector('.header__item a.active')
            menuActive.classList.remove('active')
            item.classList.add('active')
        })
    })
}

const hamburger = document.querySelector('.hamburger span')
const menuHamburger = document.querySelector('.header__menu__list.show')
if (hamburger) {
   // console.log(hamburger);
    hamburger.addEventListener('click', (e) => {
        e.preventDefault()
        if (hamburger.classList.contains('active')) {
            hamburger.classList.remove('active')
            menuHamburger.style.display = 'none'
        } else {
            hamburger.classList.add('active')
            menuHamburger.style.display = 'flex'
        }
    })
}

async function article() {
    /*==========================> AFFICHER ALEATOIREMENT DANS LE BANNER<===========*/
    function arrayRandom(a) {
        return a[Math.floor(Math.random() * a.length)];
    }
    const banArticle = document.querySelector('.article__top')
    banArticle.innerHTML = 
        `
        <div class="load">
            <img src="images/loading1.gif" class="loader" alt="">
        </div>
        `
    let articleInsert = document.querySelector('.catArticle__list')
    articleInsert.innerHTML= 
        `
        <div class="load">
            <img src="images/loading1.gif" class="loader" alt="">
        </div>
        `
    const insert = document.querySelector('.article__bottom__right__list')
    insert.innerHTML += 
        `
        <div class="load">
            <img src="images/loading1.gif" class="loader" alt="">
        </div>
        `
    let respons = await fetch(`https://test1.ecole229.bj/api/posts`)

    var tableau = [];
    let base = await respons.json()
   //console.log(base);
    if (base.status === true && base.posts.length > 0) {
        base.posts.forEach(item => {
            var si = item
            const aleatoire = `
            <div class="article__img">
                <img src="https://test1.ecole229.bj${item.image}" alt="">
            </div>
            <div class="article__descrip">
                <h4>${item.title}</h4>
                <div class="author">
                    <img src="https://test1.ecole229.bj${item.user_avatar}" alt)"">
                    <div class="author__info">
                        <h5>${item.user_name}</h5>
                        <h5>${item.published_at}</h5>
                    </div>
                </div>
            </div>
               `
            tableau.push(aleatoire)
        })
        arrayRandom(tableau);
        banArticle.innerHTML = arrayRandom(tableau)
    }


    /*==========================> AFFICHER LES CATEGORIES<===========*/
    /* const insert = document.querySelector('.article__bottom__right__list')
 */
    /* insert.innerHTML+=`<img src="images/loading1.gif" class="loader" alt="">` */
    let catTab = []
    let respon = await fetch(`https://test1.ecole229.bj/api/categories`)
    let dataBase = await respon.json()
    if (dataBase.status ===true && dataBase.categories.length > 0) {
        let insertImg = document.querySelector('.article__bottom__right__list img')
        insertImg.style.display= 'none'
        dataBase.categories.forEach(categorie => {
            const cat = `
                <div class="article__bottom__right__item">
                    <a href="" class="article__name" id="${categorie.id}">${categorie.name}</a>
                </div>
            `
            catTab.push(cat);
            //console.log(catTab);
            insert.innerHTML += cat;
        
        });
        /*===================================> MENU CATEGORIE ACTIVE <===============================*/
        const menuCategorie = document.querySelectorAll('.article__bottom__right__item a')
        if (menuCategorie) {
            //console.log(menuCategorie);
            menuCategorie.forEach(item => {
                //console.log(item);
                item.addEventListener('click', (e) => {
                    e.preventDefault()
                    const menuCategorieActive = document.querySelector('.article__bottom__right__item a.active')
                    menuCategorieActive.classList.remove('active')
                    item.classList.add('active')
                })
            })
        } 
    }

    /*==========================> AFFICHER LES ARTICLES<===========*/
    /* let articleInsert = document.querySelector('.catArticle__list')
    articleInsert.innerHTML= `<img src="images/loading1.gif" class="loader" alt="">` */
    let response = await fetch(`https://test1.ecole229.bj/api/posts`)
    let data = await response.json()
    var allcatArticle = []
    if (data.status === true && data.posts.length > 0) {
        articleInsert.innerHTML= ''
        data.posts.forEach(item => {
            const art = `
                <div class="article__bottom__left__item" id="${item.category_id}">
                    <div class="article__bottom__left__img">
                        <img src="https://test1.ecole229.bj${item.image}" alt="">
                    </div>
                    <div class="article__information">
                        <div class="article__date">
                            <span class="mdi mdi-calendar-month"></span> 
                           <h4>Date: ${item.published_at}</h4>
                        </div>
                        <div class="article__title">
                           <h4>Titre: ${item.title}</h4>
                        </div>
                    </div>
                    <a href="" id="${item.id}">Voir plus</a>
                </div>
               `
            allcatArticle.push(art)
            arrayRandom(allcatArticle);
            articleInsert.innerHTML += arrayRandom(allcatArticle);
        })

    }
    var detailButton = articleInsert.querySelectorAll('.article__bottom__left__item a')
    /* console.log(detailButton); */
    if (detailButton && detailButton.length > 0) {
        detailButton.forEach(item => {
            item.addEventListener('click', (e) => {
                //console.log(item);
                e.preventDefault()
                const itemParent = item.closest('.article__bottom__left__item')
                if (itemParent) {
                   // console.log(itemParent);
                    const articleId = item.getAttribute('id')
                    const trier = data.posts.find((post) => Number(post.id) === Number(articleId))
                    if (trier) {
                        const itemdata = trier
                        articleMode(itemdata)
                    }
                }
            })
        })
    }

    /*=====================> AFFICHER PAR CATEGORIE <====================*/
    let cate = document.querySelectorAll('.article__bottom__right__item a')
    var catId;
    if (cate) {
        cate.forEach(item => {
            item.addEventListener('click', (e) => {
                articleInsert.innerHTML = ''
                e.preventDefault()
                catId = item.id
                let tableau = []
                if (Number(catId) === 0) {
                    tableau = data.posts
                    if (tableau) {
                        tableau.forEach(item => {
                            let art = `
                                <div class="article__bottom__left__item" id="${item.category_id}">
                                    <div class="article__bottom__left__img">
                                       <img src="https://test1.ecole229.bj${item.image}" alt="">
                                    </div>
                                    <div class="article__information">
                                        <div class="article__date">
                                            <span class="mdi mdi-calendar-month"></span> 
                                           <h4>Date: ${item.published_at}</h4>
                                        </div>
                                        <div class="article__title">
                                           <h4>Titre: ${item.title}</h4>
                                        </div>
                                    </div>
                                    <a href=""id="${item.id}">Voir plus</a>
                                </div>
                               `
                            articleInsert.innerHTML += art
                           // console.log(art);
                        })
                    } var detailButton = articleInsert.querySelectorAll('.article__bottom__left__item a')
                    /*   console.log(detailButton); */
                    if (detailButton && detailButton.length > 0) {
                        detailButton.forEach(item => {
                            item.addEventListener('click', (e) => {
                                //console.log(item);
                                e.preventDefault()
                                const itemParent = item.closest('.article__bottom__left__item')
                                if (itemParent) {
                                   // console.log(itemParent);
                                    const articleId = item.getAttribute('id')
                                    const trier = data.posts.find((post) => Number(post.id) === Number(articleId))
                                    if (trier) {
                                        const itemdata = trier
                                        //console.log(itemdata);
                                        articleMode(itemdata)
                                    }
                                }
                            })
                        })
                    }

                } else {
                    tableau = data.posts.filter((post) => Number(post.category_id) === Number(catId))
                    tableau.forEach(insert => {
                        const inst = `
                            <div class="article__bottom__left__item">
                                <div class="article__bottom__left__img">
                                    <img src="https://test1.ecole229.bj${insert.image}"alt="">
                                </div>
                                <div class="article__information">
                                    <div class="article__date">
                                        <span class="mdi mdi-calendar-month"></span> 
                                        <h4><strong>Date: </strong> ${insert.published_at}</h4>
                                    </div>
                                    <div class="article__title">
                                        <h4><strong>Titre: </strong>${insert.title}</h4>
                                    </div>
                                </div>
                                <a href=""id="${insert.id}">Voir plus</a>
                            </div>
                        `
                        articleInsert.innerHTML += inst
                    })
                } var detailButton = articleInsert.querySelectorAll('.article__bottom__left__item a')
                //console.log(detailButton); 
                
                if (detailButton && detailButton.length > 0) {
                    detailButton.forEach(item => {
                        item.addEventListener('click', (e) => {
                            //console.log(item);
                            e.preventDefault()
                            const itemParent = item.closest('.article__bottom__left__item')
                            if (itemParent) {
                                console.log(itemParent);
                                const articleId = item.getAttribute('id')
                                const trier = data.posts.find((post) => Number(post.id) === Number(articleId))
                                if (trier) {
                                    const itemdata = trier
                                    
                                    articleMode(itemdata)
                                }
                            }
                        })
                    })
                }
            })
        })
    }

}
article()
let articelModal = document.querySelector('.modal')

function articleMode(itemdata) {
    if(articelModal){
        articelModal.classList.add('active')
    }
    /* const generateStep = () => {
        if (itemdata) {
            const ArtcileTab = itemData.description.split('ETAPE')
            ArtcileTab.forEach(item => {
                pList += `<p>${item}</p>`
            })
            return pList
        }
    } */
    let html = `
    <div class="close__modal">
        <a href="#" class="close"><a>
    </div>
    <div class="modal__content">
        <div class="modal__img">
            <img src="https://test1.ecole229.bj${itemdata.image}" alt="">
        </div>
        <div class="modal__title">
            <h2>${itemdata.title}</h2>
        </div>
        <div class="modal__description">
            <p>${itemdata.description}</p>
        </div>
        <div class="modal__author">
            <div class="author__img">
                <img src="https://test1.ecole229.bj${itemdata.user_avatar}" alt="">
            </div>
            <h4>${itemdata.user_name}</h4>
        </div>
    </div>
    `
    articelModal.innerHTML = html
    const closeModal = document.querySelector('.close')
    if(closeModal){
        console.log(closeModal);
        closeModal.addEventListener('click',()=>{
            console.log(closeModal);
            articelModal.classList.remove('active')
        })
    }
    
}