async function decrypt() {
    let rawKey = document.getElementById("key").value;
    let rawKeyArr = rawKey.split("-");
    rawKeyArr[0] = rawKeyArr[0].slice(-2);
    let rawKeyArrReverse  = rawKeyArr .reverse();
    let key = rawKeyArrReverse.join("");

    console.log(key);

    let encryptedArr = ["U2FsdGVkX19ROrDUnPRpRLBYTw6s0vPYq+kqXLX3GPyPghVnU0szZFAgTjt9ERyLTMbQOHKXNFYjLM9lFGzF4Q==",
                    "U2FsdGVkX1/MKm5lrABj8LWqIXu2R7zvmB/33nBYHr7kW6ldTtb9xT88A9EVIrTzT35olvL4XlzS/fpbCXvyCX9anQvd69C+3Xo/txd7XOc+myyDhbo8NIihpysUQL+1aQIcY7ijK1V+YH7GIYQdh0jx3qv4/twX1qZdi61vwFDJMfbJOfOmCTkBr1HqQjI1ReFIhbULVzF3L9OLUMsG9X+AFvppoPVTSgVNx6JGpSRxHFzdfBd9Bwry4MjzXUDUAM9mDRkNYoxvGTjOPNIGUliYr03CNmwlSBRx15B9RYM=",
                    "U2FsdGVkX1/Dzc87dDgouoDsemr8i7sS0BNqHrPwpJJKqajg1pKt9yFj3ettsgsgKGzEv1HRVKF0Ku+3cP3lwTQvcakJAaRmO/IQ6MUE0A9NuJXY8XX1MjwHHVPRRwwWbsBHKj9ppJisn4zUO2SS/JrU59Yqx1CloduLnIUVOabceRoHp5LSU9qGQdiqt3thEARJpaKRFqYjRbyZAgcW+1aE+3engytrk0kO1LiquyzcYc06vCfhwWjPdvDyiLGhktzuIhyrR1VEXUwJ/Hm8/V+Dd/dtTSufSl40BTXi3FDzGkghQ9A9+HPv6arZ6rcZVBqV7m+rBmbF6LjIQ3AZcCzPtN/lPoIHpVlX3TCxdQyhheiNjPRV26rq+JBVSykWUEDvh+T9hNGjr+ItoKmk4wgv52hFZRdBh01VaoZBuICqDHqdfxw4SHm3VB+W+svp9UfdsocmuRV8EXmy9OHCpp2zFRK1ZfO6ZMzhUadT3zI=",
                    "U2FsdGVkX1/aFK8wFmuJL7sh1FuOtrIVpVcA5RZZr2NKneyz2uThff9s+gmrO2IegbT1aRed6UiFLo1R6JYW+320icSSEl7P1SsK4D5xEvDTCod2AUQMfK25jibTTLGU",
                    "U2FsdGVkX1+RTRZ0oUWuTxABLa9E04AUtLMdwCG0Th62ozmLtDws74fT5ZHPn2RouSeaqzPDpCAFiJZ/Gjj/IQ==",
                    "U2FsdGVkX19+zSCmtZKj0Ld1YK7x4LxMcQIJWJDB6ik="];

    if (key == CryptoJS.AES.decrypt("U2FsdGVkX1+lUcg0Gj+em2sPAWNcv68j4FEz8wHZDxo=", 'RbTBot1969').toString(CryptoJS.enc.Utf8))
    {
        const song = document.getElementById("song");
        song.play();
        song.volume = 0.5;

        await new Promise(r => setTimeout(r, 2000));

        document.getElementById("card-container").style.display = "none";

        let textContainer = document.getElementById("text-container");

        for (let i = 0; i < encryptedArr.length; i++) {
            let encryptedText = encryptedArr[i];

            await transitionText(encryptedText, CryptoJS.AES.decrypt(encryptedText, key).toString(CryptoJS.enc.Utf8), i, textContainer);
        }
    }

    initImageRain();
}

function transitionText(textInput, textOutput, i, textContainer) {
    return new Promise((resolve, reject) => {
        let container = document.createElement("p");
        container.setAttribute("id", `text-contained-${i}`);

        let promises = [];

        for (let i = 0; i < textOutput.length; i++) {
            let span = document.createElement("span");
            span.textContent = textInput[i];
            container.appendChild(span);
            promises.push(new Promise((resolve) => {
                anime({
                    targets: span,
                    textContent: textOutput[i],
                    duration: 3000,
                    delay: i * 30,
                    update: function() {
                        if (span.textContent.slice(-2) === '0 ') {
                            span.textContent = span.textContent.slice(0, -2);
                        }
                    },
                    complete: () => resolve()
                });
            }));
        }

        Promise.all(promises).then(() => {
            resolve();
        });

        textContainer.appendChild(container);
    });
}

function initImageRain() {
    let imgId = 1;
    setInterval(() => {
        createAnimatedImage('https://i.ibb.co/WpgbWnD/nanaandhachi.png', imgId);
        imgId++;
    }, 200);
}

function createAnimatedImage(src, id) {
    const image = document.createElement('img');
    image.src = src;
    image.id = id;

    const height = Math.floor(Math.random() * 201 + 50);
    console.log(height);
    image.style.height = height + 'px';


    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;
    const randomBottomPosition = Math.floor(Math.random() * viewportWidth);
    const randomDistance = Math.floor(Math.random() * (viewportHeight - viewportHeight/8 + 1) + viewportHeight/8);
    const randomDuration = Math.floor(Math.random() * 7001 + 5000);

    image.style.position = 'absolute';
    image.style.bottom = '-' + viewportHeight + 'px';
    image.style.left = randomBottomPosition + 'px';

    /*
    img {
        mix-blend-mode: multiply;
        background-color: rgba(255, 0, 0, 0.5); // Adjust opacity for intensity
    }
    */

    anime({
        targets: image,
        bottom: randomDistance,
        easing: 'easeInOutCubic',
        duration: randomDuration,
        delay: Math.random() * 500,
        complete: () => {
            anime({
                targets: image,
                opacity: 0,
                duration: 1000,
                easing: 'easeOutQuad',
                complete: () => image.remove()
            });
        }
    });

    document.body.appendChild(image);
}
