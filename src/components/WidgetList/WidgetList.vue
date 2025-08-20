<script setup>
import WidgetTodo from "../WidgetTodo/WidgetTodo.vue";
import WidgetCalendar from "../WidgetCalendar/WidgetCalendar.vue";
import WidgetNote from "../WidgetNote/WidgetNote.vue";
import WidgetFinance from "../WidgetFinance/WidgetFinance.vue";
import FullCalendar from "../FullCalendar/FullCalendar.vue";
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 w-full">
    <WidgetTodo />
    <WidgetCalendar />
    <WidgetNote />
    <WidgetFinance />
  </div>
</template>
