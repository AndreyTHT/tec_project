// Получаем все элементы с классом butn
const buttons = document.querySelectorAll('.butn');
const toggleButton = document.getElementById('toggleInventory');
const sound = document.getElementById('sound');
const burgerMenu = document.getElementById('burgerMenu');
const sidebar = document.getElementById('sidebar');
const menuText = document.getElementById('menuText');
const inventory = document.getElementById('inventory');
const buttonRect = toggleButton.getBoundingClientRect();
const containersDiv = inventory.querySelector('.containers');
let f = true;

// Для каждого элемента с классом butn добавляем обработчики событий
buttons.forEach(button => {
    // Когда нажата кнопка мыши (mousedown)
    button.addEventListener('mousedown', () => {
        button.classList.add('active'); // Добавляем класс для уменьшения размера при нажатии
    });

    // Когда кнопка мыши отпущена (mouseup)
    button.addEventListener('mouseup', () => {
        button.classList.remove('active'); // Убираем класс для возвращения к состоянию hover
    });

    // Если пользователь уводит мышь после нажатия и не отпускает
    button.addEventListener('mouseleave', () => {
        button.classList.remove('active'); // Убираем класс, если мышь уходит за пределы кнопки
    });
});


// ---------------------------------- burger
burgerMenu.addEventListener('click', () => {
    burgerMenu.classList.toggle('active_krest'); // Переключаем класс 'active'
    document.body.classList.toggle('menu-active'); // Переключаем класс 'menu-active' у body

    // Переключаем класс 'active' у боковой панели
    sidebar.classList.toggle('active');

    if (sidebar.classList.contains('active')) {
        menuText.style.display = 'block';
        // Добавляем задержку 500 миллисекунд перед появлением текста
        setTimeout(() => {
            menuText.innerHTML = 
            `<h2 class="home butn "><a href="main.html">Главное меню</a></h2>
            <h2 class="home butn "><a href="img0.html">Иллюстрация</a></h2>
            <h2 class="back butn"><a href="main.html">Назад</a></h2>`;
        }, 200); // Задержка 0.5 секунды
    } else {
        menuText.innerHTML = '';
        menuText.style.display = 'none';
    }
});

//-------------------------- sound
sound.addEventListener('click', () => {
    sound.classList.toggle('change_image');

    if (sound.classList.contains('change_image')) {
        sound.setAttribute("src", "imgs/sound_0.png");
    } else {
        sound.setAttribute("src", "imgs/sound.png");
    }
});


//-------------------------------- inventory


inventory.classList.remove('hidden');
    
// Получаем высоту элемента inventory
if (f){
    imgs_add();
    f = false;
}
const inventoryHeight = inventory.offsetHeight;
    
// Скрываем inventory после того, как получили высоту, если нужно
inventory.classList.add('hidden');


toggleButton.addEventListener('click', function() {
    
    if (toggleButton.classList.contains('enb')){
        // Располагаем inventory выше на его высоту

        inventory.style.top = `${buttonRect.top - inventoryHeight - 20}px`;
        inventory.style.left = `${buttonRect.left}px`;

        // Показать/скрыть инвентарь по клику
        inventory.classList.toggle('hidden');
    }
});


// ------------------------------------- krest-inventory
// Обработчик для крестика "×" для скрытия инвентаря и показа кнопки
document.getElementById('closeInventory').addEventListener('click', function() {
    // Скрыть инвентарь
    inventory.classList.add('hidden');
});



function imgs_add() {
    const images = [];

    // Генерация путей к изображениям от 1 до 29
    for (let i = 1; i <= 23; i++) {
        images.push(`imgs/items/${i}.png`);
    }

    // Добавляем контейнеры и изображения в инвентарь
    images.forEach((image, index) => {

        try {
            // Создаем контейнер для изображения
        const container = document.createElement('div');
        container.className = 'container-inv';

        const img = document.createElement('img');
            img.src = image;
            img.alt = `Item ${index + 1}`;
            
        // Добавляем изображение в контейнер
        container.appendChild(img);
        img.classList.add('draggable')
        // Добавляем контейнер в секцию инвентаря
        containersDiv.appendChild(container);
        } catch (error) {
            console.error(`Произошла ошибка при добавлении изображения: ${error}`);
        }
    });
}



const start = document.getElementById('start');
const scene = document.getElementById('scene');

start.addEventListener('click', () => {

    scene.classList.toggle('hidden');

    scene.style.backgroundPosition = 'center';
    scene.style.backgroundImage = 'url("imgs/items/human.png")';
    scene.style.backgroundSize = '30%';
    scene.style.backgroundRepeat = 'no-repeat';
    scene.style.height = '100%';

    toggleButton.classList.toggle('enb');
    start.innerHTML = `<a href="docs.html">Дальше</a>`;

});

$(".draggable").draggable({
    appendTo: "body",
    containment: false,
    revert: "invalid"
});

// Делаем элемент сцены droppable
// Делаем элементы draggable
$(".draggable").draggable({
    appendTo: "body",
    containment: false,
    revert: "invalid"
});

// Делаем элемент сцены droppable
$(".scene").droppable({
    accept: ".draggable",
    drop: function(event, ui) {
        // Получаем элемент, который был перетащен
        var draggedElement = ui.helper;

        // Увеличиваем размеры перетащенного элемента
        draggedElement.css({
            width: '370px',
            height: '420px'
        });

        // Находим координаты центра сцены
        var sceneWidth = $(this).width();
        var sceneHeight = $(this).height();
        var centerX = sceneWidth / 2;
        var centerY = sceneHeight / 2;

        // Находим размеры перетащенного элемента
        var elementWidth = draggedElement.width();
        var elementHeight = draggedElement.height();

        // Вычисляем новые координаты для расположения элемента по центру или чуть выше/ниже
        var newLeft = centerX - (elementWidth / 2) + 120;
        var newTop = centerY - (elementHeight / 2) + 20; // -10 для смещения выше центра, +10 для ниже

        // Устанавливаем новые координаты
        draggedElement.css({
            position: 'absolute', // Позволяет задать точное положение
            left: newLeft + 'px',
            top: newTop + 'px'
        });

        // Перемещаем его внутрь зоны
        draggedElement.appendTo(this);
    }
});
