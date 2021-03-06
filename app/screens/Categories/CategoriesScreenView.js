import T from 'prop-types';
import React from 'react';
import { TouchableOpacity } from 'react-native';

import { CategoriesList, Icon, ScreenWrapper, SegmentedControl, Subtitle, TabContainer } from '../../components';
import { categoriesTypes as types } from '../../constants/categories';
import screens from '../../constants/screens';
import { colors } from '../../styles';
import { getParam } from '../../utils/navHelpers';
import s from './styles';

const onNavigate = (nav, screen, params) => () => nav.navigate(screen, params);

const goEditCategory = navigation => (category) => {
  navigation.navigate(screens.CategoryEditor, {
    title: 'Sửa hạng mục thu/chi',
    category,
  });
};

const goAddCategory = navigation => () => {
  navigation.navigate(screens.CategoryEditor, {
    title: 'Thêm hạng mục thu/chi',
  });
};

const tabs = [types.income, types.expense];

const Categories = ({
  navigation,
  incomeCategories,
  expenseCategories,
  selectedTabIndex,
  setSelectedTabIndex,
}) => {
  const onSelectCategory = getParam('onSelectCategory')(navigation) || goEditCategory(navigation);

  return (
    <ScreenWrapper style={s.container}>
      <Subtitle leftText="Hạng mục thu/chi" withLittlePadding />
      <SegmentedControl
        values={tabs}
        selectedIndex={selectedTabIndex}
        onTabPress={setSelectedTabIndex}
      />

      <TabContainer
        selectedTabIndex={selectedTabIndex}
        tabIndex={0}
        topOffset={90}
      >
        <CategoriesList
          categories={incomeCategories}
          onSelect={onSelectCategory}
        />
      </TabContainer>
      <TabContainer
        selectedTabIndex={selectedTabIndex}
        tabIndex={1} 
        topOffset={90}
      >
        <CategoriesList
          categories={expenseCategories}
          onSelect={onSelectCategory}
        />
      </TabContainer>

 

    </ScreenWrapper>
  );
};

Categories.navigationOptions = ({ navigation }) => ({
  headerRight: (
    <TouchableOpacity
      onPress={goAddCategory(navigation)}
    >
      <Icon
        name="plus"
        color={colors.MainBlue}
        width={60}
        height={24}
      />
    </TouchableOpacity>
  ),
});


Categories.propTypes = {
  navigation: T.object,
  incomeCategories: T.array,
  expenseCategories: T.array,
  selectedTabIndex: T.number,
  setSelectedTabIndex: T.func,
};

export default Categories;
