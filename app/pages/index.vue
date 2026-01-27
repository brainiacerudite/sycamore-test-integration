<template>
  <div class="min-h-screen bg-gray-50/50 p-6 md:p-12 font-sans text-slate-900">
    <div class="max-w-5xl mx-auto space-y-8">
      <div
        class="flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <div>
          <h1 class="text-2xl font-bold tracking-tight text-slate-900">
            Team Members
          </h1>
          <p class="text-slate-500 text-sm mt-1">
            Manage your team access and permissions.
          </p>
        </div>

        <div class="flex items-center gap-3">
          <div class="relative group">
            <div
              class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
            >
              <svg
                class="h-4 w-4 text-gray-400 group-focus-within:text-blue-500 transition"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search by name..."
              class="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 w-full md:w-64 transition shadow-sm"
            />
          </div>

          <button
            @click="refresh"
            class="p-2 text-gray-500 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 hover:text-gray-700 transition shadow-sm active:scale-95"
            title="Reload Data"
          >
            <svg
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
          </button>
        </div>
      </div>

      <div class="min-h-100">
        <div v-if="isLoading" class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div
            v-for="n in 10"
            :key="n"
            class="h-40 bg-white border border-gray-100 rounded-xl shadow-sm p-6 animate-pulse flex flex-col justify-between"
          >
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 bg-gray-100 rounded-full"></div>
              <div class="space-y-2 flex-1">
                <div class="h-4 bg-gray-100 rounded w-3/4"></div>
                <div class="h-3 bg-gray-100 rounded w-1/2"></div>
              </div>
            </div>
            <div class="space-y-3">
              <div class="h-4 bg-gray-50 rounded"></div>
              <div class="h-4 bg-gray-50 rounded"></div>
            </div>
          </div>
        </div>

        <div
          v-else-if="error"
          class="flex flex-col items-center justify-center py-20 bg-white border border-red-100 rounded-xl shadow-sm text-center"
        >
          <div class="bg-red-50 p-3 rounded-full mb-4">
            <svg
              class="w-8 h-8 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h3 class="text-slate-900 font-semibold mb-2">
            Unable to load members
          </h3>
          <p class="text-slate-500 text-sm mb-6 max-w-xs">
            We encountered an issue connecting to the directory service.
          </p>
          <button
            @click="refresh"
            class="px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-800 transition"
          >
            Try Again
          </button>
        </div>

        <div v-else-if="hasNoResults" class="text-center py-24">
          <p class="text-slate-900 font-medium">No members found</p>
          <p class="text-slate-500 text-sm mt-1">
            Try adjusting your search query.
          </p>
        </div>

        <div v-else class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div
            v-for="user in filteredUsers"
            :key="user.id"
            class="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-blue-200 transition duration-300 group flex flex-col justify-between"
          >
            <div class="flex items-start justify-between mb-4">
              <div class="flex items-center gap-3">
                <img
                  :src="`https://ui-avatars.com/api/?name=${user.name}&background=eff6ff&color=3b82f6&bold=true`"
                  :alt="user.name"
                  class="w-12 h-12 rounded-full border-2 border-white shadow-sm"
                />
                <div>
                  <h2
                    class="font-semibold text-slate-900 leading-tight group-hover:text-blue-600 transition"
                  >
                    {{ user.name }}
                  </h2>
                  <p
                    class="text-xs text-slate-500 font-medium tracking-wide uppercase mt-0.5"
                  >
                    {{ user.company.name }}
                  </p>
                </div>
              </div>
              <span
                class="inline-flex items-center px-2 py-1 rounded-full text-[10px] font-medium bg-green-50 text-green-700 ring-1 ring-inset ring-green-600/20"
              >
                Active
              </span>
            </div>

            <div class="space-y-3">
              <div class="flex items-center gap-2 text-sm text-slate-600">
                <svg
                  class="w-4 h-4 text-slate-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <a
                  :href="`mailto:${user.email}`"
                  class="hover:text-blue-600 hover:underline truncate"
                  >{{ user.email }}</a
                >
              </div>

              <div class="flex items-center gap-2 text-sm text-slate-600">
                <svg
                  class="w-4 h-4 text-slate-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
                <span class="italic text-xs text-slate-400"
                  >"{{ user.company.catchPhrase }}"</span
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { users, isLoading, error, refresh } = useUsers();

const searchQuery = ref("");

const filteredUsers = computed(() => {
  if (!users.value) return [];
  if (!searchQuery.value) return users.value;

  const query = searchQuery.value.toLowerCase();
  return users.value.filter(
    (user) =>
      user.name.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query),
  );
});

const hasNoResults = computed(() => {
  return !isLoading.value && !error.value && filteredUsers.value.length === 0;
});
</script>
