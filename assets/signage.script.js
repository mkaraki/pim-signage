const twoup_signage = signageList.filter(signage => signage.type === '2up');
const full_signage = signageList.filter(signage => signage.type === 'full');

let dispSignages = [];

{
    dispSignages = dispSignages.concat(twoup_signage);

    if (twoup_signage.length % 2 === 1) {
        dispSignages.push({ image: 'img/blank.jpg', type: '2up' });
    }

    dispSignages = dispSignages.concat(full_signage);
}

let currentIdx = -1;

const signageWindow = document.getElementById('signage');

const updateScript = () => { 
    currentIdx++;

    let currentSignage = dispSignages[currentIdx] ?? {};

    signageWindow.classList.toggle('fadein', false);
    signageWindow.classList.toggle('fadeout', true);

    setTimeout(() => {
        signageWindow.classList.toggle('fadeout', false);

        if (currentIdx >= dispSignages.length) {
            location.reload();
        }

        signageWindow.innerHTML = '';
    
        if (currentSignage.type === '2up') {
            const img1 = document.createElement('img');
            img1.src = currentSignage.image;
            img1.className = 'two';
    
            const img2 = document.createElement('img');
            img2.src = dispSignages[currentIdx + 1].image;
            img2.className = 'two';
    
            signageWindow.appendChild(img1);
            signageWindow.appendChild(img2);
    
            currentIdx++;
        }
        else if (currentSignage.type === 'full') {
            const img = document.createElement('img');
            img.src = currentSignage.image;
            img.className = 'full';
    
            signageWindow.appendChild(img);
        }

        signageWindow.classList.toggle('fadein', true);
    }, 500);
}

setInterval(() => {
    updateScript();
}, 5000);

updateScript();