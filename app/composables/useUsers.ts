import type { User } from "~/types"

const BASE_URL = 'https://jsonplaceholder.typicode.com'

export const useUsers = () => {
    const { data: users, status, error, refresh } = useFetch<User[]>(`${BASE_URL}/users`, {
        lazy: true,
        server: false
    })

    const isLoading = computed(() => status.value === 'pending')

    return {
        users,
        isLoading,
        error,
        refresh
    }
}