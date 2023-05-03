<script>
import { array, object } from 'yup';

export default {
    props: {
        info: { type: object, default: [] },

    },
    // emits: ["update:activeIndex"],
    methods: {
        // updateActiveIndex(index) {
        //     this.$emit("update:activeIndex", index);
        // }
    }
};

</script>
<template>
    <div class="user-info">
      <table>
        <tbody>
          <tr>
            <td class="label">Họ và tên:</td>
            <td>{{ info.fullname }}</td>
          </tr>
          <tr>
            <td class="label">Username:</td>
            <td>{{ info.username }}</td>
          </tr>
          <tr>
            <td class="label">Email:</td>
            <td>{{ info.email }}</td>
          </tr>
          <tr>
            <td class="label">Số điện thoại:</td>
            <td>{{ info.phone }}</td>
          </tr>
          <tr>
            <td class="label">Địa chỉ liên hệ:</td>
            <td>{{ info.address }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <style scoped>
  .user-info {
    margin: 20px;
  }
  
  table {
    border-collapse: collapse;
    width: 100%;
  }
  
  td, th {
    padding: 8px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }
  
  th {
    background-color: #f2f2f2;
  }
  
  .label {
    font-weight: bold;
    width: 200px;
  }
  </style>