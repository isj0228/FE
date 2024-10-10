import { createStore } from 'vuex';
import bondModule from './modules/bond';
import fundModule from './modules/fund';
import savingModule from './modules/saving';
import depositModule from './modules/deposit';
import portfolioModule from './modules/portfolio';
import cartModule from './modules/cart';
import recentViewModule from '@/store/modules/recentView.js';
import personaModule from './modules/persona';

const store = createStore({
  modules: {
    bond: bondModule,
    fund: fundModule,
    saving: savingModule,
    deposit: depositModule,
    portfolio: portfolioModule,
    cart: cartModule,
    recentView: recentViewModule,
    persona: personaModule,
  },
});

export default store;
