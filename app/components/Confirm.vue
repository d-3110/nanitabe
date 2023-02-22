<script setup lang="ts">
import { ref } from 'vue'
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'

// const open = ref(true)

interface Props {
  message: string,
  open: boolean,
  onCloseModal: Function,
  loading: boolean
}

const Props = withDefaults(defineProps<Props>(), {
  message: '',
  open: false,
  onCloseModal: () => {},
  loading: false
});
</script>
<template>
  <TransitionRoot as="template" :show="open" class="w-full">
    <Dialog as="div" class="relative z-10">
      <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      </TransitionChild>

      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
            <DialogPanel class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div class="sm:flex sm:items-start">
                  <div v-if="loading" class="animate-spin mx-auto flex h-12 w-12 items-center justify-center">
                    <img src="@/assets/images/nanitabe.png">
                  </div>
                  <div v-else class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-error text-white sm:mx-0 sm:h-10 sm:w-10">
                    <font-awesome-icon class="block fa-lg" aria-hidden="true" :icon="['fa','check']"/>
                  </div>
                  <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900">{{ message }}</DialogTitle>
                  </div>
                </div>
              </div>
              <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 text-center">
                <button @click="onCloseModal(false)" class="btn mr-16 btn-lg btn-secondary" :disabled="loading">NO</button>
                <button @click="onCloseModal(true)" class="btn btn-lg btn-error" :disabled="loading">OK</button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<style scoped>
#headlessui-dialog-panel-5 {
  width: 100%;
}
</style>