<template>
  <div class="main-wrapper">
    <AppSidebar></AppSidebar>
    <!-- <header class="px-8 border-b border-b-neutral-800">
      <nav
        class="mx-auto w-full max-w-screen-xl flex h-24 items-center justify-between"
      >
        <ul class="flex gap-6">
          <li>One Item</li>
          <li>Second Item</li>
          <li>Third Item</li>
        </ul>
        <ul class="flex gap-6">
          <li>Labas</li>
          <li>What's next</li>
        </ul>
      </nav>
    </header> -->
    <main
      class="content-wrapper mx-auto mt-10 bg-neutral-600/10 p-8 overflow-x-hidden rounded-lg"
    >
      <div class="mx-auto">
        <NuxtPage :key="123" />
      </div>
    </main>
    <footer></footer>
  </div>
</template>

<style lang="postcss">
.main-wrapper {
  @apply bg-neutral-950 text-neutral-300 flex;
}
.content-wrapper {
  @apply max-w-screen-lg;
}
</style>
