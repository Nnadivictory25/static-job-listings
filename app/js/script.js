let jobLisings = []
const mainCtn = document.querySelector('main')
const filterCtn = document.querySelector('.filtersCtn')
const filterTagsCtn = document.querySelector('.filter')
let searchQuery = []
let roleArr = []
let levelArr = []
let loaded = true

Toastify({
    text: `Click on the tags tablet to filter jobs`,
    duration: 3000,
    newWindow: true,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: false, // Prevents dismissing of toast on hover
    style: {
        background: "hsl(180, 29%, 50%)",
        color: '#fff',
    },
}).showToast();


fetch('./data.json')
    .then(response => response.json())
    .then(data => {
        jobLisings = data

        jobLisings.map(job => {
            const { company, logo, 'new': isNew, featured, position, role, level, postedAt, contract, location, languages, tools } = job
            let allData = [role, level, languages.join(' '), tools.length !== 0 ? tools.join(' ') : null]
            job.filters = allData.join(' ').split(' ').filter(fil => fil !== '')
            if (!roleArr.includes(role)) roleArr.push(role);
            if (!levelArr.includes(level)) levelArr.push(level);
            
            mainCtn.innerHTML += /*html*/`
            <div data-role=${role}  data-level=${level} data-languages="${languages.join(', ')}" data-tools="${tools.length !== 0 ? tools.join(', ') : ''}" class="card relative flex flex-col lg:flex-row lg:justify-between bg-white rounded-md px-6 font-semibold lg:px-9 lg:items-center lg:py-5 my-9 shadow-lg">
                <div class="card__infoSection mt-11 lg:mt-0 lg:flex gap-x-10 items-center">
                <img class="w-14 lg:w-24 lg:h-24 absolute lg:relative lg:top-0 top-[-20px]" src=${logo} alt="">
                <div class="card__infoSection--companyInfo self-center">
                    <div class="header flex items-center gap-x-3 py-3">
                        <p class="companyName font-semibold mr-2 text-lg">${company}</p>
                        ${isNew ? `<span class="uppercase new font-semibold py-1 px-3 rounded-full">New!</span>
                        ` : ''}
                        ${featured ? `<span class="uppercase featured font-semibold py-1 px-3 rounded-full">Featured</span>
                        ` :''}
                    </div>
                    <p class="position font-semibold text-lg"> ${position} </p>
                    <div class="listingInfo flex items-center gap-x-2 py-1">
                        <p>${postedAt}</p>
                        <i class="bi bi-dot"></i>
                        <p>${contract}</p>
                        <i class="bi bi-dot"></i>
                        <p>${location}</p>
                    </div>
                </div>
                </div>
                <div class="card__tagsSection py-8 text-lg flex flex-wrap gap-4 ">
                    ${generateTags(job)}
                </div>
                <hr class="bg-gray-300 absolute w-[89%] top-44 h-[1.7px]  hide-for-desktop">
          </div>
            `
        })
    })
    .catch(err => console.log(err))




let generateTags = (job) => {
    let tagsArr = []
    const { role, level, languages, tools } = job
    let html = ''
    
    tagsArr.push(role, level)
    languages.forEach(lang => {
        tagsArr.push(lang)
    });
    tools.forEach(tool => {
        tagsArr.push(tool)
    });

    let getFunction = (tag) => {
        if (role.includes(tag)) {
            return `onclick="filterBy('role', '${tag}')"`
        }
        if (level.includes(tag)) {
            return `onclick="filterBy('level', '${tag}')"`
        }
        if (languages.includes(tag)) {
            return `onclick="filterBy('language', '${tag}')"`
        }
        if (tools.includes(tag)) {
            return `onclick="filterBy('tool', '${tag}')"`
        }
    }

    tagsArr.forEach(tag => {
        html += /*html*/ `
        <button ${getFunction(tag)} class="py-2 px-4 rounded-md"><span class="animate__animated ${loaded ? 'animate__flash' : ''}">${tag}</span></button>
        `
    })

    setTimeout(() => {
        loaded = false
    }, 1000);
    return html;
}



let roleFiltered = false 
let levelFiltered = false
let filterBy = (id, category) => {

    if (!searchQuery.includes(category)) {

        if (id == 'role' && roleFiltered == false) {
            roleFiltered = true
            searchQuery.push(category)

            Toastify({
                text: `${category} has been added to filter`,
                duration: 1500,
                newWindow: true,
                close: true,
                gravity: "top", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                stopOnFocus: false, // Prevents dismissing of toast on hover
                style: {
                    background: "hsl(180, 29%, 50%)",
                    color: '#fff',
                },
            }).showToast();
            
        } else if (id == 'role' && roleFiltered) {

            Toastify({
                text: `${category} is a ${id} and a ${id} has been added to filter`,
                duration: 2500,
                newWindow: true,
                close: true,
                gravity: "top", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                stopOnFocus: false, // Prevents dismissing of toast on hover
                style: {
                    background: "#fff",
                    color: '#ff0000',
                },
            }).showToast();

        } else if (id == 'level' && !levelFiltered) {
            levelFiltered = !levelFiltered
            searchQuery.push(category)

            Toastify({
                text: `${category} has been added to filter`,
                duration: 1500,
                newWindow: true,
                close: true,
                gravity: "top", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                stopOnFocus: false, // Prevents dismissing of toast on hover
                style: {
                    background: "hsl(180, 29%, 50%)",
                    color: '#fff',
                },
            }).showToast();

        } else if (id == 'level' && levelFiltered) {
            
            Toastify({
                text: `${category} is a ${id} and a ${id} has been added to filter`,
                duration: 2500,
                newWindow: true,
                close: true,
                gravity: "top", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                stopOnFocus: false, // Prevents dismissing of toast on hover
                style: {
                    background: "#fff",
                    color: '#ff0000',
                },
            }).showToast();

        } else if (id == 'languages' || 'tools') {
            searchQuery.push(category)

            Toastify({
                text: `${category} has been added to filter`,
                duration: 1500,
                newWindow: true,
                close: true,
                gravity: "top", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                stopOnFocus: false, // Prevents dismissing of toast on hover
                style: {
                    background: "hsl(180, 29%, 50%)",
                    color: '#fff',
                },
            }).showToast();

        }

    } else if (searchQuery.includes(category)) {
        Toastify({
            text: `${category} ${id} is already in the filter`,
            duration: 1500,
            newWindow: true,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: false, // Prevents dismissing of toast on hover
            style: {
                background: "#fff",
                color: '#ff0000',
            },
          }).showToast();
    }

    updateUI()


    filterCtn.classList.remove('invisible')
    filterTagsCtn.innerHTML = /*html*/`
        ${generateFilters()}
    `

    console.log(searchQuery)
}


let generateFilters = () => {
    let html = ''

    searchQuery.forEach(query => {
        html += /*html*/`
        <button class="button cursor-pointer rounded-md overflow-hidden pl-3 font-semibold flex items-center justify-between">${query} <div onclick="removeFilter('${query}')" class="h-full p-2 ml-1 "><img class="w-3" src="./images/close (2).png" alt=""></div></button>
        `
    })

    return html;
}

let removeFilter = (filter) => {
    searchQuery = searchQuery.filter(query => query !== filter)
    if (roleArr.includes(filter)) roleFiltered = false
    if (levelArr.includes(filter)) levelFiltered = false

    Toastify({
        text: `${filter} have been removed !`,
        duration: 1000,
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: false, // Prevents dismissing of toast on hover
        style: {
            background: "linear-gradient(to right, hsl(180, 14%, 20%), hsl(180, 14%, 20%))",
        },
      }).showToast();

    filterTagsCtn.innerHTML = /*html*/`
        ${generateFilters()}
    `

    updateUI()

    if (searchQuery.length == 0) {
        filterCtn.classList.add('invisible')

        mainCtn.innerHTML = ''

        jobLisings.map(job => {
            const { company, logo, 'new': isNew, featured, position, role, level, postedAt, contract, location, languages, tools } = job
            
            mainCtn.innerHTML += /*html*/`
            <div data-role=${role}  data-level=${level} data-languages="${languages.join(', ')}" data-tools="${tools.length !== 0 ? tools.join(', ') : ''}" class="card relative flex flex-col lg:flex-row lg:justify-between bg-white rounded-md px-6 font-semibold lg:px-9 lg:items-center lg:py-5 my-9 shadow-lg">
                <div class="card__infoSection mt-11 lg:mt-0 lg:flex gap-x-10 items-center">
                <img class="w-14 lg:w-24 lg:h-24 absolute lg:relative lg:top-0 top-[-20px]" src=${logo} alt="">
                <div class="card__infoSection--companyInfo self-center">
                    <div class="header flex items-center gap-x-3 py-3">
                        <p class="companyName font-semibold mr-2 text-lg">${company}</p>
                        ${isNew ? `<span class="uppercase new font-semibold py-1 px-3 rounded-full">New!</span>
                        ` : ''}
                        ${featured ? `<span class="uppercase featured font-semibold py-1 px-3 rounded-full">Featured</span>
                        ` :''}
                    </div>
                    <p class="position font-semibold text-lg"> ${position} </p>
                    <div class="listingInfo flex items-center gap-x-2 py-1">
                        <p>${postedAt}</p>
                        <i class="bi bi-dot"></i>
                        <p>${contract}</p>
                        <i class="bi bi-dot"></i>
                        <p>${location}</p>
                    </div>
                </div>
                </div>
                <div class="card__tagsSection py-8 text-lg flex flex-wrap gap-4 ">
                    ${generateTags(job)}
                </div>
                <hr class="bg-gray-300 absolute w-[89%] top-44 h-[1.7px]  hide-for-desktop">
          </div>
            `
        })
    }
}

let clearFilter = () => {
    searchQuery = []
    filterCtn.classList.add('invisible')
    levelFiltered = false
    roleFiltered = false

    Toastify({
        text: `All filters cleared !`,
        duration: 2000,
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: false, // Prevents dismissing of toast on hover
        style: {
            background: "hsl(180, 29%, 50%)",
            color: '#fff',
        },
    }).showToast();
    
    updateUI()
}

let updateUI = () => { 
    let filteredJobs
    let filterPassArr = []

    if (searchQuery.length == 0) {

        mainCtn.innerHTML = ''

        jobLisings.map(job => {
            const { company, logo, 'new': isNew, featured, position, role, level, postedAt, contract, location, languages, tools } = job
            
            mainCtn.innerHTML += /*html*/`
            <div data-role=${role}  data-level=${level} data-languages="${languages.join(', ')}" data-tools="${tools.length !== 0 ? tools.join(', ') : ''}" class="card relative flex flex-col lg:flex-row lg:justify-between bg-white rounded-md px-6 font-semibold lg:px-9 lg:items-center lg:py-5 my-9 shadow-lg">
                <div class="card__infoSection mt-11 lg:mt-0 lg:flex gap-x-10 items-center">
                <img class="w-14 lg:w-24 lg:h-24 absolute lg:relative lg:top-0 top-[-20px]" src=${logo} alt="">
                <div class="card__infoSection--companyInfo self-center">
                    <div class="header flex items-center gap-x-3 py-3">
                        <p class="companyName font-semibold mr-2 text-lg">${company}</p>
                        ${isNew ? `<span class="uppercase new font-semibold py-1 px-3 rounded-full">New!</span>
                        ` : ''}
                        ${featured ? `<span class="uppercase featured font-semibold py-1 px-3 rounded-full">Featured</span>
                        ` :''}
                    </div>
                    <p class="position font-semibold text-lg"> ${position} </p>
                    <div class="listingInfo flex items-center gap-x-2 py-1">
                        <p>${postedAt}</p>
                        <i class="bi bi-dot"></i>
                        <p>${contract}</p>
                        <i class="bi bi-dot"></i>
                        <p>${location}</p>
                    </div>
                </div>
                </div>
                <div class="card__tagsSection py-8 text-lg flex flex-wrap gap-4 ">
                    ${generateTags(job)}
                </div>
                <hr class="bg-gray-300 absolute w-[89%] top-44 h-[1.7px]  hide-for-desktop">
          </div>
            `
        })


    } else {
        mainCtn.innerHTML = ''

        for (let i = 0; i < searchQuery.length; i++) {
            filteredJobs = jobLisings.filter(job => job.filters.includes(searchQuery[i]))
        }

        filteredJobs.map((job, index) => {
            const { filters } = job

            for (let i = 0; i < searchQuery.length; i++) {
                !filters.includes(searchQuery[i]) ? filterPassArr.push(index) : false
            }
        })

        filterPassArr = filterPassArr.length > 0 ? [...new Set(filterPassArr)] : filterPassArr
        filteredJobs = filteredJobs.filter(job => !filterPassArr.includes(filteredJobs.indexOf(job)))
    }
    
    if (filteredJobs) {
        filteredJobs.map(job => {
            const { company, logo, 'new': isNew, featured, position, role, level, postedAt, contract, location, languages, tools } = job
            
    
            mainCtn.innerHTML += /*html*/`
            <div data-role=${role}  data-level=${level} data-languages="${languages.join(', ')}" data-tools="${tools.length !== 0 ? tools.join(', ') : ''}" class="card relative flex flex-col lg:flex-row lg:justify-between bg-white rounded-md px-6 font-semibold lg:px-9 lg:items-center lg:py-5 my-9 shadow-lg">
                <div class="card__infoSection mt-11 lg:mt-0 lg:flex gap-x-10 items-center">
                <img class="w-14 lg:w-24 lg:h-24 absolute lg:relative lg:top-0 top-[-20px]" src=${logo} alt="">
                <div class="card__infoSection--companyInfo self-center">
                    <div class="header flex items-center gap-x-3 py-3">
                        <p class="companyName font-semibold mr-2 text-lg">${company}</p>
                        ${isNew ? `<span class="uppercase new font-semibold py-1 px-3 rounded-full">New!</span>
                        ` : ''}
                        ${featured ? `<span class="uppercase featured font-semibold py-1 px-3 rounded-full">Featured</span>
                        ` :''}
                    </div>
                    <p class="position font-semibold text-lg"> ${position} </p>
                    <div class="listingInfo flex items-center gap-x-2 py-1">
                        <p>${postedAt}</p>
                        <i class="bi bi-dot"></i>
                        <p>${contract}</p>
                        <i class="bi bi-dot"></i>
                        <p>${location}</p>
                    </div>
                </div>
                </div>
                <div class="card__tagsSection py-8 text-lg flex flex-wrap gap-4 ">
                    ${generateTags(job)}
                </div>
                <hr class="bg-gray-300 absolute w-[89%] top-44 h-[1.7px]  hide-for-desktop">
          </div>
            `
        })
    }
    
}