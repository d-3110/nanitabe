<script setup lang="ts">
import { GoTrueAdminApi } from '@supabase/gotrue-js';
import { useForm, useField, useIsFormDirty, useIsFormValid } from 'vee-validate'
import { object, string } from 'yup'
definePageMeta({
  middleware: 'auth'
})

onMounted(() => {
  prompt.value = '今日は何を食べたらいい？料理名を答えて！'
})


const schema = object({
  prompt: string().required('質問は必須'),
})
const { validate, resetForm } = useForm({ validationSchema: schema })
const { value: prompt, errorMessage: promptError } = useField<string>('prompt')

const buttonDisabled = ref<boolean>(false)
const messages = ref<Array<any>>([])
const isDirty = useIsFormDirty()
const isValid = useIsFormValid()
const isDisabled = computed(() => {
  return !isDirty.value || !isValid.value || buttonDisabled.value
})

const chatClass = ((isMine: boolean) => {
  return isMine ? 'chat-end' : 'chat-start'
})
const chatColorClass = ((isMine: boolean) => {
  return isMine ? 'chat-bubble-secondary' : 'chat-bubble-primary'
})

const submit = async () => {
  const result = await validate()
  if (result.valid) {
    buttonDisabled.value = true
    addMessage(true, prompt.value)
    const { data, error } = await useFetch('/api/v1/ai', {
      method: 'POST',
      body: {
        prompt: prompt.value
      }
    })
    if (error.value) {
      console.log('ERROR: ', error.value)
    }
    addMessage(false, data.value.choices[0].text)
    buttonDisabled.value = false
  }
}
const addMessage = (isMine: boolean, text: string) => {
  messages.value.push({ isMine: isMine, text: text })
}
</script>
<template>
    <div>
      <div v-for="message in messages" :class="'chat ' + chatClass(message.isMine)">
        <div :class="'chat-bubble ' + chatColorClass(message.isMine)">{{ message.text }}</div>
      </div>
    </div>
    <div class="divider"></div>
    <from class="prose flex justify-center w-full">
        <textarea v-model="prompt" placeholder="質問" class="textarea textarea-bordered w-full"></textarea>
        <button
          @click="submit"
          class="btn btn-lg btn-primary"
          type="button"
          :disabled="isDisabled"
          :class="{ loading: isDisabled }"
        >
          聞く
        </button>
      </from>
</template>