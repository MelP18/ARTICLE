async function article() {
    /*==========================> AFFICHER ALEATOIREMENT DANS LE BANNER<===========*/
    const banArticle = document.querySelector('.article__top')
    let respons = await fetch(`https://test1.ecole229.bj/api/posts`)
    let base = await respons.json()
    if (base.posts) {
        base.posts.forEach(item => {
            var si = item
            const aleatoire = `
            <div class="article__img">
                <img src="https://test1.ecole229.bj${item.image}" alt="">
                <div class="article__info">
                    <h4>${item.published_at}</h4>
                    <h4>${item.title}</h4>
                    <h4>${item.user_name}</h4>
                </div>
            </div>
            <div class="article__descrip">
                <h4>${item.title}</h4>
                <p>${item.description}</p>
                <button>Voir plus</button>
            </div>
               `
            var tableau = [];
            tableau.push(aleatoire)
            tableau
            var rand = Math.floor(Math.random() * tableau.length);
            var rValue = tableau[rand];
            /*  console.log(rValue) */
        })
        /*  banArticle .innerHTML += aleatoire */
    }




    /*==========================> AFFICHER LES CATEGORIES<===========*/
    const insert = document.querySelector('.article__bottom__right__list')
    let respon = await fetch(`https://test1.ecole229.bj/api/categories`)
    let dataBase = await respon.json()
    if (dataBase.categories) {
        dataBase.categories.forEach(categorie => {
            const cat = `
                <div class="article__bottom__right__item">
                    <a href="" class="article__name" id="${categorie.id}">${categorie.name}</a>
                </div>
            `
            insert.innerHTML += cat;
        });

    }


    /*==========================> AFFICHER LES ARTICLES<===========*/
    let articleInsert = document.querySelector('.catArticle__list')
    let response = await fetch(`https://test1.ecole229.bj/api/posts`)
    let data = await response.json()
    let allcatArticle = document.querySelector('.allcatArticle__list')
    console.log(data.posts)
    if (data.posts) {
        data.posts.forEach(item => {
            const art = `
               <div class="article__bottom__left__item">
                   <div class="article__bottom__left__img">
                       <img src="https://test1.ecole229.bj${item.image}" alt="">
                   </div>
                   <div class="article__information">
                       <div class="article__date">
                           <h4>${item.published_at}</h4>
                       </div>
                       <div class="article__title">
                           <h4>${item.title}</h4>
                       </div>
                   </div>
                   <a href="">Voir plus</a>
               </div>
               `
            articleInsert.innerHTML += art
            /*let all = document.querySelector('.article__bottom__right__all a')

            all.addEventListener('click', (e) => {
                e.preventDefault()
                allcatArticle.style.display = 'grid'

                articleInsert.style.display = 'none'
                catArticle.style.display = 'none'

                allcatArticle.innerHTML += art


            })*/
        })
    }

    /*=====================> AFFICHER PAR CATEGORIE <====================*/
    let cate = document.querySelectorAll('.article__bottom__right__item a')
    let catArticle = document.querySelector('.catArticle__list')
    if (cate) {
        cate.forEach(item => {
            item.addEventListener('click', (e) => {
                catArticle.innerHTML = ''
                e.preventDefault()
                let catId = item.id
                //console.log(catId);
                let tableau = []
                if (Number(catId) === 0) {
                    tableau = data.posts
                    if (tableau) {
                        tableau.forEach(item => {
                            let art = `
                               <div class="article__bottom__left__item">
                                   <div class="article__bottom__left__img">
                                       <img src="https://test1.ecole229.bj${item.image}" alt="">
                                   </div>
                                   <div class="article__information">
                                       <div class="article__date">
                                           <h4>${item.published_at}</h4>
                                       </div>
                                       <div class="article__title">
                                           <h4>${item.title}</h4>
                                       </div>
                                   </div>
                                   <a href="">Voir plus</a>
                               </div>
                               `
                            articleInsert.innerHTML += art
                        })
                    }

                } else {
                    tableau = data.posts.filter((post) => Number(post.category_id) === Number(catId))
                    tableau.forEach(insert => {
                        const inst = `
                            <div class="catArticle__item">
                                <div class="catArticle__img">
                                    <img src="https://test1.ecole229.bj${insert.image}" alt="">
                                </div>
                                <div class="catArticle__information">
                                    <div class="catArticle__Date">
                                        <h4>${insert.published_at}</h4>
                                    </div>
                                    <div class="catArticle__title">
                                        <h4>${insert.title}</h4>
                                    </div>
                                </div>
                                <a href="">Voir plus</a> 
                            </div>
                        `

                        articleInsert.innerHTML += inst
                    })
                }
            })
        })
    }
}

article()
/* async function categories() {
     const insert = document.querySelector('.article__bottom__right__list')
    let response = await fetch(`https://test1.ecole229.bj/api/categories`)
    let dataBase = await response.json()
   /*  console.log(dataBase);  
    if (dataBase.categories) {
        dataBase.categories.forEach(item => {
            const cat = `
                <div class="article__bottom__right__item">
                    <a href="" class="article__name">${item.name}</a>
                </div>
            `
            /*  console.log(cat);  
            insert.innerHTML += cat;
        });

    }
}
categories() */

/* let categorie = document.querySelectorAll('.article__bottom__right__item ')
console.log(categorie); */

