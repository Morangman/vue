<template>
    <div class="todo">
        <div class="card text-left">
            <div class="card-header">
                ToDo Component
            </div>
            <div class="card-body">
                <h5 class="card-title">My tasks</h5>
                <button
                    type="button"
                    class="btn btn-primary"
                    data-toggle="modal"
                    data-target="#exampleModal"
                >
                    Open task form
                </button>
                <div
                    class="modal fade"
                    id="exampleModal"
                    tabindex="-1"
                    role="dialog"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                >
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">
                                    Modal title
                                </h5>
                                <button
                                    type="button"
                                    class="close"
                                    data-dismiss="modal"
                                    aria-label="Close"
                                >
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <form>
                                    <div class="form-group">
                                        <label for="task-title"
                                            >Task title</label
                                        >
                                        <input
                                            v-model="model.title"
                                            type="text"
                                            class="form-control"
                                            id="task-title"
                                            aria-describedby="emailHelp"
                                        />
                                    </div>
                                    <div class="form-group">
                                        <label for="task-desc"
                                            >Task description</label
                                        >
                                        <textarea
                                            v-model="model.description"
                                            class="form-control"
                                            id="task-desc"
                                        ></textarea>
                                    </div>
                                    <div class="form-group">
                                        <label for="task-type">Task type</label>
                                        <select
                                            v-model="model.taskType"
                                            class="form-control"
                                            name="task-type"
                                            id="task-type"
                                        >
                                            <option
                                                v-for="(item,
                                                index) of taskTypes"
                                                v-bind:value="item"
                                                :key="index"
                                                >{{ item.title }}</option
                                            >
                                        </select>
                                    </div>
                                    <button
                                        type="submit"
                                        class="btn btn-primary"
                                        @click.prevent="submit"
                                        :disabled="!isValid"
                                    >
                                        Submit
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card-text">
                    <ul class="pt-3">
                        <li
                            v-for="(item, index) in filteredTaskList"
                            :key="index"
                            class="d-flex justify-content-between mb-3"
                            :style="{
                                'background-color': item.taskType.color,
                            }"
                        >
                            <div>
                                <h4 v-if="item.status === 'completed'">
                                    <s>{{ item.title }}</s>
                                </h4>
                                <h4 v-else>{{ item.title }}</h4>
                                <p>{{ item.description }}</p>
                                <p>{{ item.taskType.title }}</p>
                            </div>
                            <button
                                class="btn btn-primary"
                                @click="item.status = 'completed'"
                            >
                                Compled
                            </button>
                        </li>
                    </ul>
                </div>
                <div class="card-footer">
                    <button
                        class="btn"
                        :class="{ 'btn-primary': !filterStatus }"
                        @click="filterStatus = ''"
                    >
                        All
                    </button>
                    <button
                        class="btn"
                        :class="{ 'btn-primary': filterStatus === 'completed' }"
                        @click="filterStatus = 'completed'"
                    >
                        Completed
                    </button>
                    <button
                        class="btn"
                        :class="{
                            'btn-primary': filterStatus === 'incompleted',
                        }"
                        @click="filterStatus = 'incompleted'"
                    >
                        InCompleted
                    </button>
                    Active tasks count: {{ taskList.length }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Task } from '../models/task';

export default {
    name: 'ToDo',
    props: {},
    data: () => {
        return {
            model: new Task(),
            taskList: [],
            filterStatus: '',
            taskTypes: [
                {
                    title: 'Невідкладна',
                    color: 'red',
                },
                {
                    title: 'Важлива',
                    color: 'pink',
                },
                {
                    title: 'Звичайна',
                    color: 'green',
                },
                {
                    title: 'Незначна',
                    color: 'blue',
                },
            ],
        };
    },
    methods: {
        submit() {
            this.taskList.push(this.model);
            this.model = new Task();
        },
    },
    watch: {
        message() {
            console.log('Nessage changed');
        },
    },
    computed: {
        messageLength() {
            return ('' + this.message).length;
        },
        isValid() {
            return (
                this.model.title &&
                this.model.description &&
                this.model.taskType
            );
        },
        filteredTaskList() {
            return this.taskList.filter((item) => {
                if (!this.filterStatus) return true;
                return item.status === this.filterStatus;
            });
        },
    },
};
</script>

<style scoped>
.todo {
    background-color: aqua;
}
</style>
