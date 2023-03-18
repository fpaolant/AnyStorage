import {createNavigationContainerRef} from '@react-navigation/native';

export const navigationService = createNavigationContainerRef();

export function navigate(name, params) {
  if (navigationService.isReady()) {
    navigationService.navigate(name, params);
  }
}

export function goBack() {
  if (navigationService.isReady()) {
    navigationService.goBack();
  }
}

