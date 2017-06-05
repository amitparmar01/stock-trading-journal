import getMuiTheme from 'material-ui/styles/getMuiTheme';

import AppColors from './appColors';

var AppMuiTheme = getMuiTheme({
    toolbar: {
      color: AppColors.light3,
      hoverColor: AppColors.light3,
      backgroundColor: AppColors.dark1,
      height: 64,
      titleFontSize: 20,
      iconColor: AppColors.light3,
      separatorColor: AppColors.light3,
      menuHoverColor: AppColors.light3,
    },
    drawer: {
        color: AppColors.dark1
    }
});

export default AppMuiTheme;