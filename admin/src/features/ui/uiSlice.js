import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  confirmModal: {
    isOpen: false,
    title: "",
    message: "",
    onConfirm: null,
    onCancel: null,
    type: "danger", // 'danger' | 'warning' | 'info'
  },
  notifications: [],
  loading: {
    projects: false,
    skills: false,
    messages: false,
  },
}

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    openConfirmModal: (state, action) => {
      state.confirmModal = {
        isOpen: true,
        ...action.payload,
      }
    },
    closeConfirmModal: (state) => {
      state.confirmModal = {
        ...initialState.confirmModal,
        isOpen: false,
      }
    },
    addNotification: (state, action) => {
      state.notifications.push({
        id: Date.now(),
        ...action.payload,
      })
    },
    removeNotification: (state, action) => {
      state.notifications = state.notifications.filter((notification) => notification.id !== action.payload)
    },
    setLoading: (state, action) => {
      const { key, value } = action.payload
      state.loading[key] = value
    },
  },
})

export const { openConfirmModal, closeConfirmModal, addNotification, removeNotification, setLoading } = uiSlice.actions
export default uiSlice.reducer
