<template>
  <main>
    <section>
        <n-h1 style="text-align: center;"><n-text type="default" strong >Login</n-text></n-h1>
      <n-card size="huge" hoverable embedded>
        <n-form :model="model" ref="formRef" :rules="rules">
          <n-form-item path="username" label="Username">
            <n-input
              v-model:value="model.username"
              @keydown.enter.prevent
              placeholder="Joe"
            />
          </n-form-item>
          <n-form-item path="password" label="Password">
            <n-input
              v-model:value="model.password"
              type="password"
              @keydown.enter.prevent
              placeholder="********"
            />
          </n-form-item>
          <n-button
            :disabled="model.username === null"
            @click="handleValidateButtonClick"
            type="primary"
          >
            Log in
          </n-button>
        </n-form>
      </n-card>
    </section>
  </main>
</template>

<script lang="ts" allowjs>
import { defineComponent, ref } from "vue";
import { useMessage } from "naive-ui";
import {store} from '../store'
import {router} from '../Router.vue'

export default defineComponent({
  setup() {
    const formRef = ref(null);
    const message = useMessage();
    const modelRef = ref({
      username: null,
      password: null,
    });

    return {
      formRef,
      model: modelRef,
      rules: {
        age: [
          {
            required: true,
            message: "Username is required",
            trigger: ["input", "blur"],
          },
        ],
        password: [
          {
            required: true,
            message: "Password is required",
          },
        ],
      },

      handleValidateButtonClick(e: Event) {
        e.preventDefault();
        formRef!.value!.validate((errors: Error[]) => {
          if (!errors) {
            store.commit('signup', modelRef.value.username)
            router.push('/chat')
            message.success("Successful login");
          } else {
            
            message.error("Invalid");
          }
        });
      },
    };
  },
});
</script>

<style scoped>
main {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
section {
  width: clamp(100px, 60vw, 700px);
  min-height: clamp(250px, 50vh, 700px);
}
</style>
