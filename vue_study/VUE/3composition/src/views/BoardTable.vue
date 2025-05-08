<template>
  <DataTable :columns="columns" ajax="/api/board" class="display">
    <thead>
      <tr>
        <th>A</th>
        <th>B</th>
      </tr>
    </thead>
  </DataTable>
</template>

<script setup>
import DataTable from 'datatables.net-vue3';
import DataTablesCore from 'datatables.net';

// 플러그인 적용
DataTable.use(DataTablesCore);
const columns = [
  { data: "id" },
  { data: "title" },
  { data: "writer" }
]
</script>
