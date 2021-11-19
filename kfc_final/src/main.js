import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import 'lib-flexible/flexible'
import '@/assets/delete-icon/iconfont.css'

// 引入vant组件,全局注册
import { Button, Form, Field, Popup, Tabbar, TabbarItem, Search, Swipe, SwipeItem, NavBar, GoodsAction, GoodsActionIcon, GoodsActionButton, Stepper, Tab, Tabs } from 'vant';
import { SubmitBar } from 'vant';

Vue.use(SubmitBar);
import { Checkbox, CheckboxGroup } from 'vant';

Vue.use(Checkbox);
Vue.use(CheckboxGroup);

import { Cell, CellGroup } from 'vant';

Vue.use(Cell);
Vue.use(CellGroup);

Vue.use(Tab);
Vue.use(Tabs);
Vue.use(Stepper);
import { Tag } from 'vant';

Vue.use(Tag);
import { ContactList } from 'vant';
import { AddressList } from 'vant';
import { AddressEdit } from 'vant';
import { NoticeBar } from 'vant';

Vue.use(NoticeBar);
Vue.use(AddressEdit);
Vue.use(AddressList);
Vue.use(ContactList);
Vue.use(GoodsAction);
Vue.use(GoodsActionButton);
Vue.use(GoodsActionIcon);
Vue.use(NavBar);
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Search);
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(Button)
Vue.use(Form);
Vue.use(Field);
Vue.use(Popup);

import { Image as VanImage } from 'vant';
Vue.use(VanImage)

import { Lazyload } from 'vant';
Vue.use(Lazyload);

import { Icon } from 'vant';
Vue.use(Icon);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
