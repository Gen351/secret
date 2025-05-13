<template>
    <section>
      <div>
        <div class="flex flex-col gap-4">
          <div class="flex justify-between text-2xl xl:text-3xl items-center">
            <p>{{ nameRef }}</p>
            <div class="flex gap-10">
              <div class="flex gap-2 xl:gap-4">
                <p>&#x20B1 {{ priceRef }}</p>
                <p>x</p>
                <p>{{ quantityRef }}</p>
              </div>
              <div>
                <button class="hover:cursor-pointer" @click="isEditing = !isEditing">
                  Edit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </template>