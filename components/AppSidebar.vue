<template>
  <section
    class="max-w-xs w-full text-white h-screen p-6 bg-neutral-900 font-inter"
  >
    <header class="flex items-center gap-4 mb-10">
      <div class="logo fill-green-700 drop-shadow-lg relative w-10 h-10">
        <IconLogo class="shadow-md"></IconLogo>
        <div
          class="bg-gradient-to-t from-green-900 to-green-700 blur-xl rounded-lg inset-0 absolute"
        ></div>
      </div>
      <span class="font-bold text-xl">SORVO</span>
    </header>
    <nav>
      <section>
        <h2>MAIN MENU</h2>
        <ul class="flex flex-col gap-3 w-full">
          <li>
            <SidebarButton :active="true">Dashboard</SidebarButton>
          </li>
          <li>
            <button>Products</button>
            <ul class="pl-4">
              <li>Motherboards</li>
              <li>PSUs</li>
              <li>CPUs</li>
              <li>GPUs</li>
            </ul>
          </li>
        </ul>
      </section>
    </nav>
  </section>
</template>

<script setup lang="ts"></script>
