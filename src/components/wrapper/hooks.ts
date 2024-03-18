import {
    useThemeParams,
    useExpand,
  } from '@vkruglikov/react-telegram-web-app';

export const useWrapperApi = () => {
    const [colorScheme, themeParams] = useThemeParams();
    const [isExpanded, expand] = useExpand();
    expand();

    return {
        colorScheme,
        themeParams
    }
}