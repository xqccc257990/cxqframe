export default {
    // namespaced: true,
  state: {
      ruleForm: {},  // 
  },
  getters: {
 
  },
  mutations: {
      setruleForm(state, form){  // 
       
        console.log( "setruleForm",Object.keys(form)[0])
        let key= Object.keys(form)[0]
        let values= Object.values(form)[0]
        state.ruleForm[key]= values
        state.ruleForm = Object.assign({},  state.ruleForm)
        

        console.log( "setruleForm",state.ruleForm,form)
    }
  },
  actions: {
      
  }
}