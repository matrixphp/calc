<template>
  <q-page class="row justify-evenly">
    <div class="row q-mt-sm no-wrap justify-center q-mx-sm main-container">
      <div class="row items-start">
        <div class="calc-grid">
          <q-btn dense class="button-size" :color="theme.btn2.bg" :text-color="theme.btn2.txt" @click="dataAdd('(')">
            <template v-slot:default>
              <div style="font-size: 1.1rem">(</div>
            </template>
          </q-btn>
          <q-btn dense class="button-size" :color="theme.btn2.bg" :text-color="theme.btn2.txt" @click="dataAdd(')')">
            <template v-slot:default>
              <div style="font-size: 1.1rem">)</div>
            </template>
          </q-btn>
          <q-btn dense class="button-size" :color="theme.btn2.bg" :text-color="theme.btn2.txt" @click="dataAdd('.')">
            <template v-slot:default>
              <div style="font-size: 1.3rem">.</div>
            </template>
          </q-btn>
          <q-btn dense class="button-size" :color="theme.btn2.bg" :text-color="theme.btn2.txt" @click="dataPercent()">
            <template v-slot:default>
              <div style="font-size: 1.1rem">%</div>
            </template>
          </q-btn>

          <q-btn dense class="button-size" :color="theme.btn1.bg" :text-color="theme.btn1.txt" label="7" @click="dataAdd('7')"/>
          <q-btn dense class="button-size" :color="theme.btn1.bg" :text-color="theme.btn1.txt" label="8" @click="dataAdd('8')"/>
          <q-btn dense class="button-size" :color="theme.btn1.bg" :text-color="theme.btn1.txt" label="9" @click="dataAdd('9')"/>
          <q-btn dense class="button-size" :color="theme.btn3.bg" :text-color="theme.btn3.txt" @click="dataAdd('/')">
            <template v-slot:default>
              <div style="font-size: 1.1rem">/</div>
            </template>
          </q-btn>

          <q-btn dense class="button-size" :color="theme.btn1.bg" :text-color="theme.btn1.txt" label="4" @click="dataAdd('4')"/>
          <q-btn dense class="button-size" :color="theme.btn1.bg" :text-color="theme.btn1.txt" label="5" @click="dataAdd('5')"/>
          <q-btn dense class="button-size" :color="theme.btn1.bg" :text-color="theme.btn1.txt" label="6" @click="dataAdd('6')"/>
          <q-btn dense class="button-size" :color="theme.btn3.bg" :text-color="theme.btn3.txt" icon="close" size="sm" @click="dataAdd('*')"/>

          <q-btn dense class="button-size" :color="theme.btn1.bg" :text-color="theme.btn1.txt" label="1" @click="dataAdd('1')"/>
          <q-btn dense class="button-size" :color="theme.btn1.bg" :text-color="theme.btn1.txt" label="2" @click="dataAdd('2')"/>
          <q-btn dense class="button-size" :color="theme.btn1.bg" :text-color="theme.btn1.txt" label="3" @click="dataAdd('3')"/>
          <q-btn dense class="button-size" :color="theme.btn3.bg" :text-color="theme.btn3.txt" icon="remove" size="sm" @click="dataAdd('-')"/>

          <q-btn dense class="button-size" :color="theme.btn1.bg" :text-color="theme.btn1.txt" label="0" @click="dataAdd(0)"/>
          <q-btn dense class="button-size" :color="theme.btn4.bg" :text-color="theme.btn4.txt" style="grid-column: 2/4; width: 6.4rem;" @click="dataCalculate()">
            <template v-slot:default>
              <div style="font-size: 1.3rem">=</div>
            </template>
          </q-btn>
          <q-btn dense class="button-size" :color="theme.btn3.bg" :text-color="theme.btn3.txt" icon="add" size="sm" @click="dataAdd('+')"/>

          <q-btn flat round :color="theme.toggle" icon="brightness_7" size="0.8rem" @click="themeToggle(!dark)"/>
        </div>
      </div>
      <div class="q-ml-sm w-100">
        <div class="row">
          <q-input dense outlined clearable autofocus ref="inputRef" v-model="data" :color="theme.input" class="no-wrap expression w-100" @keydown.enter.prevent="dataCalculate()">
            <template v-slot:prepend>
              <q-icon name="calculate" :color="theme.calc"/>
            </template>
          </q-input>
        </div>
        <div class="history q-mt-sm">
          <q-list bordered class="rounded-borders w-100">
            <q-item v-ripple>
              <q-item-section>
                <q-item-label header style="padding: 0">
                  <q-icon :icon="theme.histHead" :color="theme.hist" name="history" size="1.4rem" class="q-mr-sm"></q-icon>
                  История
                </q-item-label>
              </q-item-section>

              <q-item-section side>
                <q-btn flat round icon="close" :color="theme.histDel" size="0.7rem" @click="historyClear"/>
              </q-item-section>
            </q-item>
            <q-separator/>

            <template v-for="(v, k) in history" :key="v">
              <q-item>
                <q-item-section>
                  <q-item-label caption overline class="q-ml-sm" style="font-size: 0.9rem; cursor: pointer;" @click="dataAdd(v.data)">{{ v.data }}</q-item-label>
                  <q-item-label class="q-ml-lg" style="font-size: 1rem; cursor: pointer;" @click="dataAdd(v.result)">= {{ v.result }}</q-item-label>
                </q-item-section>

                <q-item-section side>
                  <q-btn flat round icon="delete" :color="theme.histDel" size="0.6rem" style="margin-right: 5px" @click="historyDel(v)"/>
                </q-item-section>
              </q-item>
              <q-separator inset v-if="k !== history.length - 1"/>
            </template>

            <q-item v-if="!history.length">
              <q-item-section>
                <q-item-label caption>
                  <div class="q-ml-md">—</div>
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import {ref} from 'vue';
import {useQuasar} from 'quasar';
import {getLS, historyItem, notify, setLS, themeColors} from 'src/modules/main';

const quasar = useQuasar();
const data = ref<string>('');
const dark = ref<boolean>(getLS('dark', false) as boolean);
const theme = ref({});
const history = ref(getLS('history', []) as object[]);
const inputRef = ref<HTMLInputElement>(null);

themeToggle(dark.value);

function themeToggle(v: boolean) {
  setLS('dark', v);
  dark.value = v;
  theme.value = themeColors(v);
  quasar.dark.set(v);
}

function dataAdd(v) {
  if (data.value === null) data.value = '';
  data.value += v;
  inputRef.value.focus();
}

function dataPercent() {
  data.value = parseFloat(data.value) * 0.01 + '';
}

function dataCalculate() {
  try {
    if (data.value === '') return;

    data.value = data.value.replaceAll(',', '.');
    data.value = data.value.replaceAll(' ', '');
    let result = eval(data.value);
    result = +result.toFixed(3);
    history.value.unshift({data: data.value, result: result})
    data.value = '';
    setLS('history', history.value);
  } catch (e) {
    notify('Введено некорректное значение');
  }
}

function historyDel(item: historyItem) {
  history.value = history.value.filter(v => v !== item);
  setLS('history', history.value);
}

function historyClear() {
  history.value = [];
  setLS('history', history.value);
}
</script>

<style lang="scss">
.button-size {
  height: 3rem;
  width: 3rem;
}

.expression {
  .q-field__control, .q-field__marginal {
    height: 3rem;
  }
}

.w-100 {
  width: 100%;
}

.main-container {
  max-width: 720px;
  width: 100%;
}

.calc-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 5px
}

.history {
  max-height: calc(100vh - 70px);
  overflow-y: auto;
}

.body--dark {
  .history::-webkit-scrollbar {
    width: 10px;
  }

  .history::-webkit-scrollbar-thumb {
    border: 3px solid #121212;
    background-clip: padding-box;
    border-radius: 9999px;
    background-color: #686868; // Variants: 424242 545454 686868
  }
}

.body--light {
  .history::-webkit-scrollbar {
    width: 10px;
  }

  .history::-webkit-scrollbar-thumb {
    border: 3px solid #ffffff;
    background-clip: padding-box;
    border-radius: 9999px;
    background-color: #adadad;
  }
}
</style>
