// main variables
let theInput = document.querySelector('.get-repos input'),
getButton = document.querySelector('.get-button'),
reposData = document.querySelector('.show-data');


getButton.onclick = function() {
    getRepos();
}

function getRepos() {
    
    if (theInput.value == '' || theInput.value == ' ') {
    
        // reposData.textContent = '<span>No Data To Show</span>'  // متعملش كدا لانك لو عملت كدا هيطبعلك الكلام دا بالنظ كدا في الديف لكن لكن تستعمل الاينر اتش تي ام ال لان هتضيف عنصر جديد لكن متستعملش التيكست كونتينت لان لما بتستعملو يعني بتقولو حطلي التالي 
        let msg ='Please Write GitHub Username';
        reposData.innerHTML = `<span class="mm" style="color:red">${msg}</span>` // ممكن تنشئ سبان كدا بكل بساطة و تحطها جوا الديف بالسطر دا
    
    } else {

        let userName = theInput.value;  // example   //ElzeroWebSchool   // https://api.github.com/users/ElzeroWebSchool/repos
        fetch(`https://api.github.com/users/${userName}/repos`)
        .then((response) => {
            if (response.ok) { // الكلام اللي في الاف دا مش هيتحقق غير لو الفايل بتاع الجيسون جة و كان جواه اوكي يعني كل حاجة تمام لان الوكي دي مش بتيجي في الفايل الا لو كل حاجة تمام و خلي بالك الاوكي دي بتكون في الرد اللي هوا الريسبونس و الرد دا بنحولو لملف جيسون علشان نتعامل معاه و لما بيتحول لملف جيسون مبيكونش فية الاوكي دي خلي بالك يبقي الاوكي بيكون في الرد مش في ملف الجيسون             
                console.log('good API');
            } else {
                // زي ما قلنا هتحصل في حالة لو الرد مش اوكي يعني ربعومية و اربعة
                console.log('bad API'); //  هتحصل لو الاي بي اي الرد بتاعو جة و لكن مكنش فية اوكي جواه و بما ان مفيش اوكي يبقي هيكون فية ربعومية و اربعة علشان الصفحة مش موجودة لان لينك الاي بي اي فية مشكلة يبقي السطر دا هيتحقق لو كان في غلط في لينك الاي بي اي 
                // يعني هنا اللي حصل انو راح علي الرابط اللي بعتو و كل حاجة تمام و لكن كان لما راح السرفر رد علية و كالو مفيش صفحة بالاسم دا فهيبعتلو الرد ب ربعومية و اربعة
            }
            return response.json();
        }) // or  // .then(response => response.json()) // علشان نختصر الكود لازم يكون بيرجع حاجة واحدة فقط و بنشيل منو الكيرلي براكتس اللي هيا الاقواس الكيرلي و بنشيل كلمة ريتيرن لو هانشيل الكيرلي براكتس و لو عاوزين نشيل من البراميتر الاقواس العادية ماشي مش عاوزين عادي نسيبها
        .then((repositories) => {

            reposData.innerHTML = '';
            reposData.innerHTML = `<div class='defult-div'>All repos</div>`;
                
            repositories.forEach((repo) => {
                    
                // reposData.innerHTML = `<div class='defult-div'>All repos</div>`;  // مينفعش نحط دي هنا خالص بل المفروض نحطها فوق لاني عاوز اكررها مرة واحدة فقط قبل ما الريبوس تيجي
                reposData.innerHTML += `<div class='repo-box'>${repo.name} <span> stars ${repo.stargazers_count}</span> <a href='https://github.com/${userName}/${repo.name}' target='_blank'>visite</a> </div>`;

            });
        })
        .catch((error) => {console.log(`error here ${error}`)}); // لكن السطر دا هيحصل لو في مشكلة في الشبكة عندك مفيش نت مثلا او فية مشكلة في حاجة معينة و خلي بالك لو رجعلك ربعومية و اربعة دي م مشكلة لان الرد جة بالفعل فمفيش مشكلة الكاتش هنا بتتنفز لو في مشكلة خلت ميجيش رد لكن لو الرد جة سواء ب ربعومية و اربعة او ب اوكي كدا كل حاجة تمام و الفتش مش هتشتغل
        // يبقي دي هتتنفز في حالة لو هوا مش عارف يجيب رد اصلا سواء الرد دا اوكي او حتي ربعومية و اربعةلو مش عرف يجيب رد فية اوكي ولا حتي رد فية ربعومية و اربعة السطر دا هيتنفز
        // وبتحصل لو كان فية مشكلة في الكود عندك
    }
}
