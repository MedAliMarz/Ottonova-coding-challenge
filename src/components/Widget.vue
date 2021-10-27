<template>
  <n-card
    class="widget"
    size="medium"
    embedded
    closable
    @close="handleAnswer()"
  >
    <main>
      <div v-if="type === 'date'">
        <h3 class="indication">Please pick a date.</h3>
        <div class="actions-box">
          <n-button
            @click="handleAnswer(date)"
            :style="'margin-right:10px'"
            type="default"
            dashed
            :key="date"
            v-for="date in dates"
            >{{ date }}</n-button
          >
        </div>
      </div>
      <div id="map-container" v-if="type === 'map'">
        <h3 class="indication">This is the specified map location.</h3>
        <Map :lat="data.lat" :lng="data.lng" />
      </div>
      <div v-if="type === 'rate'">
        <h3 class="indication">Please rate your experience.</h3>
        <div class="actions-box">
          <n-button
            @click="handleAnswer(data[0] + number - 1)"
            :style="'margin-right:10px'"
            type="default"
            circle
            dashed
            :key="number"
            v-for="number in data[1] - data[0] + 1"
            >{{ data[0] + number - 1 }}</n-button
          >
        </div>
      </div>
      <div v-if="type === 'complete'">
        <h3 class="indication">Do you want to close the conversation?.</h3>
        <div class="actions-box">
          <n-button
            @click="handleAnswer(label)"
            :style="'margin-right:10px'"
            type="default"
            dashed
            :key="label"
            v-for="label in data"
            >{{ label }}</n-button
          >
        </div>
      </div>
    </main>
  </n-card>
</template>

<script lang="ts">
import Map from "./Map.vue";
type DataType = String | Object | Array<String> | Array<number>;
export default {
  props: {
    type: String,
    data: Object as  DataType,
  },
  emits: ["widgetAnswer"],
  data() {
    return {};
  },
  components: {
    Map,
  },
  methods: {
    handleAnswer(answer: any) {
      if (this.type === "date") {
        this.$emit("widgetAnswer", answer as string);
      } else if (this.type === "rate") {
        this.$emit("widgetAnswer", answer as number);
      } else if (this.type === "complete") {
        this.$emit("widgetAnswer", answer as string);
      } else if (this.type === "map") {
        this.$emit("widgetAnswer", answer);
      }
    },
  },
  computed: {
    dates() {
      if (this.type === "date") {
        let date: Date = new Date(this.data);
        let days: String[] = [
          { day: "Monday", number: 1 },
          { day: "Tuesday", number: 2 },
          { day: "Wednesday", number: 3 },
          { day: "Thursday", number: 4 },
          { day: "Friday", number: 5 },
        ]
          .filter((d) => d.number !== date.getDay())
          .map((d) => d.day);
        return days;
      }
      return [];
    },
  },
};
</script>

<style scoped>
.widget {
  width: clamp(320px, 78%, 1030px);
}

main {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}
.indication {
  text-align: center;
  margin-bottom: 0.75rem;
}
.actions-box {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

#map-container {
  width: clamp(300px, 70%, 980px);
  height: clamp(320px, 78%, 1030px);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
</style>
