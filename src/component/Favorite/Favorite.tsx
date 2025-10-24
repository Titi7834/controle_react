export const FavoritesService = {
    getFavorites: (): number[] => {
        const favorites = localStorage.getItem('favorites');
        return favorites ? JSON.parse(favorites) : [];
    },

    toggleFavorite: (userId: number): number[] => {
        const favorites = FavoritesService.getFavorites();
        const newFavorites = favorites.includes(userId)
            ? favorites.filter(id => id !== userId)
            : [...favorites, userId];
        
        localStorage.setItem('favorites', JSON.stringify(newFavorites));
        
        return newFavorites;
    },

    isFavorite: (userId: number): boolean => {
        const favorites = FavoritesService.getFavorites();
        return favorites.includes(userId);
    }
};