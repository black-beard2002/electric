import { create } from "zustand";

export const useCategoryStore = create((set) => ({
	categories: [],
	setCategories: (categories) => set({ categories }),
	createCategory: async (newCategory) => {
		if (!newCategory.name || !newCategory.items) {
			return { success: false, message: "Please fill in all fields." };
		}
		const res = await fetch("http://localhost:5000/api/categories", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newCategory),
		});
		const data = await res.json();
		set((state) => ({ categories: [...state.categories, data.data] }));
		return { success: true, message: "Category created successfully" };
	},
	fetchCategories: async () => {
		const res = await fetch("http://localhost:5000/api/categories");
		const data = await res.json(); //data={success:"",data}
		set({ categories: data.data });
	},
	deleteCategory: async (cid) => {
		const res = await fetch(`http://localhost:5000/api/categories/${cid}`, {
			method: "DELETE",
		});
		const data = await res.json();
		if (!data.success) return { success: false, message: data.message };

		// update the ui immediately, without needing a refresh
		set((state) => ({ categories: state.categories.filter((category) => category._id !== cid) }));
		return { success: true, message: data.message };
	},
	updateCategory: async (cid, updatedCategory) => {
		const res = await fetch(`http://localhost:5000/api/categories/${cid}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(updatedCategory),
		});
		const data = await res.json();
		if (!data.success) return { success: false, message: data.message };

		// update the ui immediately, without needing a refresh
		set((state) => ({
			categories: state.categories.map((category) => (category._id === cid ? data.data : category)),
		}));

		return { success: true, message: data.message };
	},
}));