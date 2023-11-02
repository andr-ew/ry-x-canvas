var noise = new Noise(Math.random());

const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

const gap = 14;
const countSq = 35;
// const offsetAmp = 100;
const offsetAmp = 140;

const traversal = 0.07;
// const zstep = 0.3;
const zstep = 0.2;

function resize() {
    canvas.width = 14 * 23;
    canvas.height = 14 * 23;
}

window.addEventListener('resize', resize);

let offsets = Array(countSq * countSq);
let z = 0;
let tLast = Date.now();

function animate() {
    const dt = Date.now() - tLast;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (i = 0; i < countSq * countSq; i++) {
        const x = i % countSq;
        const y = Math.floor(i / countSq);
        //offsets[i] = Math.random() * 2 - 1;
        offsets[i] = {
            x: noise.perlin3(x * traversal, y * traversal, z),
            //y: noise.simplex3(x * traversal, y * traversal, z),
        };
    }

    z += zstep * (dt / 1000);

    //dots
    // for (x = 0; x < countSq; x++) {
    //     for (y = 0; y < countSq; y++) {
    //         const off = offsets[y * countSq + x];

    //         ctx.fillStyle = `hsl(${0.48 * 360}, 100%, 50%)`;
    //         ctx.beginPath();
    //         ctx.arc(
    //             canvas.width / 2 +
    //                 (x - countSq / 2) * gap -
    //                 gap / 2 +
    //                 off.x * offsetAmp,
    //             canvas.height / 2 +
    //                 (y - countSq / 2) * gap -
    //                 gap / 2 +
    //                 off.x * offsetAmp,
    //             2,
    //             0,
    //             Math.PI * 2
    //         );
    //         ctx.fill();
    //     }
    // }

    //lines
    {
        const getX = (x, y) => {
            const off = offsets[y * countSq + x];

            return (
                canvas.width / 2 +
                (x - countSq / 2) * gap -
                gap / 2 +
                off.x * offsetAmp
            );
        };
        const getY = (x, y) => {
            const off = offsets[y * countSq + x];

            return (
                canvas.height / 2 +
                (y - countSq / 2) * gap -
                gap / 2 +
                off.x * offsetAmp
            );
        };
        for (y = 0; y < countSq; y++) {
            ctx.beginPath();
            ctx.moveTo(getX(0, y), getY(0, y));
            for (x = 1; x < countSq; x++) {
                ctx.lineTo(getX(x, y), getY(x, y));
            }

            ctx.strokeStyle = `hsl(${0.52 * 360}, 100%, 50%)`;
            ctx.lineWidth = 1;
            ctx.stroke();
        }
    }

    tLast = Date.now();
    requestAnimationFrame(animate);
}

resize();
animate();
