# TowerDefence
Файл с задачами и дедлайнами: https://docs.google.com/document/d/1_SqVaydWlvcI9uSlJPJAdyj_mutpbiU3oD7tu9_6nFk/edit?usp=sharing 

Трелло-доска: https://trello.com/b/jgdneYsS/tower-defense

Макет со связями: https://excalidraw.com/#room=92996ba4832512990bf0,skw79Wx4jzWuaGy6A9b8Ow

Описание игры: https://docs.google.com/document/d/1Nhpa_AQJlSsN8pfET-zGdpDh9hvBxOnhxmDEjr2Ucao/edit

Гитхаб с примером реализации: https://github.com/tkazec/canvas-td

Сама игра: https://canvas-td.teddy.io/

# Ближайший дедлайн: 7 мая, суббота
К этому моменту все шаблоны должны быть готовы

# Задачи на текущую неделю:
1. Скрипт с башнями:
    - Базовый класс башни (base damage, base radius, base cost, base type "ability" - урон одному/урон всем/заморозка и тп)
    - Функция-конструктор(type, damage, radius, ...)
2. Скрипт врагов
    - Базовый класс врагов (base health, base type)
    - Функция-конструктор(type, damage=0, health, ...)
    - update-метод для helth
3. Скрипт карты
    - Tower's area: место, где можно ставить башни; либо область, либо конкретые точки
    - Enemy's area: путь, по которому двигаются враги
    - Функция, двигающая врагов
    - Функции-создатели башен/врагов
    - Придумать метод хранения объектов и позиций (башен/врагов)
    - ...
4. Контроллер (отрисовщик всего происходщего на html-страничке
    - функции, достающие информацию о карте
    - функции, отрисовывающие карту
    - функции-обработчики команд от игрока
    - ...
