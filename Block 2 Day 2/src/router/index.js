import {createRouter, createWebHistory} from "vue-router";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            redirect: {name: 'students.index'},
        },
        {
            path: "/students",
            name: "students.index",
            component: () => import("/src/pages/Students.vue")
        },
        {
            path: "/students/:studentId",
            name: "students.show",
            component: () => import("/src/pages/ShowStudent.vue"),
            props: true
        },
    ],
});

export default router;