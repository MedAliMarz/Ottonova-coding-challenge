<template>
  <main>
    <n-card id="msg" size="huge" hoverable embedded>
      <div id="messages-box">
        <chat-message
          v-for="(msg, index) in messages"
          :key="index"
          v-bind="msg"
          :position="msg.author===author?'RIGHT':'LEFT'"
          class="message"
        ></chat-message>
      </div>
    </n-card>
    
    <widget v-if="widgetOn"  :type="widgetType" :data="widgetData" @widget-answer="handleWidgetOutput"></widget>

    <section id="msg-form">
      <n-form :model="model" ref="formRef" :rules="rules">
        <n-form-item path="message">
          <n-input
            v-model:value="model.message"
            type="textarea"
            @keydown.enter.prevent
            placeholder
          />
        </n-form-item>
        <div id="msg-actions">
          <n-button @click="handleCommand" type="default">Command</n-button>
          <n-button
            :disabled="model.message === null"
            @click="handleSend"
            type="primary"
            >Send</n-button
          >
        </div>
      </n-form>
    </section>
  </main>
</template>

<script lang="ts" allowjs>
import { ref, reactive } from "vue";
import { io } from "socket.io-client";
import { useMessage } from "naive-ui";
import ChatMessageVue from "../components/ChatMessage.vue";
import WidgetVue from "../components/Widget.vue";
import {store} from '../store'
export interface Message {
  message: String;
  author: String;
}

export default {
  components: {
    ChatMessage: ChatMessageVue,
    Widget: WidgetVue,
  },

  setup() {
    const formRef = ref(null);
    const message = useMessage();
    const socket = io("https://demo-chat-server.on.ag/")
    const modelRef = ref({
      message: null,
    });
    
    const widgetType = ref('')
    const widgetData = ref(null)
    const widgetOn = ref(false)
    

    const messages: Message[] = reactive([] as Message[]);
    window.onbeforeunload = () => {
      socket.emit("leave");
    };

    socket.on("message", (data) => {
      // add message to the messages
      messages.push({
        message: data.message as string,
        author: data.author as unknown as string,
      });
    });

    socket.on("command", (data) => {
      if (!widgetOn.value){
        widgetType.value= data.command.type
        widgetData.value = data.command.data
        widgetOn.value = true
      }
    });

    function sendMessage(message: Message) {
      messages.push(message);
      socket.emit("message", message);
    }
    function sendCommand() {
      socket.emit("command", {
        author: "ottonova bot",
        command: {
          type: "any",
          data: "any",
        },
      });

    }
    return {
      messages,
      formRef,
      widgetType,
      widgetData,
      widgetOn,
      model: modelRef,
      author: store.getters.author,
      rules: {
        message: [
          {
            required: true,
            message: "message is required",
          },
        ],
      },

      handleSend(e: Event) {
        e.preventDefault();
        formRef!.value!.validate((errors: Error[]) => {
          
          if (modelRef.value?.message) {
            let msg: Message = {
              message: modelRef.value?.message,
              author: store.getters.author,
            };
            sendMessage(msg);
          }
        });
      },
      handleCommand() {
        sendCommand();
      },
      handleWidgetOutput(payload:any){
        
        if(payload){
          sendMessage({author:store.getters.author, message: payload})
        }
        widgetOn.value = false;
      }
    };
  },
};
</script>

<style scoped>
main {
  width: 100vw;
  height: 100vh;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

#msg {
  height: 80%;
  width: clamp(300px, 75%, 1000px);
  overflow-y: scroll;
}
#widget {
  width: clamp(320px, 78%, 1030px);
}
#msg-form {
  height: 20%;
  width: clamp(350px, 80%, 1050px);
}
#messages-box {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
}
#msg-actions {
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: center;
}
.message {
  margin-bottom: 10px;
}
</style>
