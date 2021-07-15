const categorias = { LAZER: "lazer", COMPRAS: "compras", ESTUDOS: "estudos" };

const tarefas = [
    { nome: "Comprar leite", categoria: categorias.COMPRAS, realizada: false },
    {
        nome: "Escutar chimbinha",
        categoria: categorias.LAZER,
        realizada: true,
    },
];

const taskList = document.getElementById("lista-tarefas");
const newTaskButton = document.getElementById("incluir-nova-tarefa");
const newTaskName = document.getElementById("nova-tarefa-nome");

taskList.innerHTML = "";

const insert = (tarefa, hidden) => {
    const el = document.createElement("li");
    el.innerHTML = tarefa.nome;
    el.classList.add("item-tarefa");
    el.classList.add(`categoria-${tarefa.categoria}`);
    el.addEventListener("click", () => {
        const toggled = el.classList.toggle("marcado");
        tarefas.map((item) => {
            if (item.nome === el.innerHTML) item.realizada = toggled;
            console.log(item);
        });
    });
    hidden && el.classList.add("retiro-no-filtro");
    tarefa.realizada && el.classList.add("marcado");
    taskList.appendChild(el);
};

tarefas.map((tarefa) => insert(tarefa));

newTaskButton.addEventListener("click", () => {
    const nome = newTaskName.value;
    const categoria = document.getElementById("nova-tarefa-categoria").value;
    insert({ nome, categoria, realizada: false });
    newTaskName.value = "";
    newTaskName.focus();
});

document
    .getElementById("filtro-de-categoria")
    .addEventListener("change", (e) => {
        const currentFilter = e.target.value;

        Array.from(taskList.children).forEach((item) => {
            currentFilter &&
            !item.classList.contains(`categoria-${currentFilter}`)
                ? item.classList.add("retido-no-filtro")
                : item.classList.remove("retido-no-filtro");
        });
    });

newTaskName.addEventListener(
    "keypress",
    (e) => e.key == "Enter" && newTaskButton.click()
);
