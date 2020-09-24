import Vue from 'vue'
import {
    Button,
    Form,
    FormItem,
    Input,
    Message,
    Breadcrumb,
    BreadcrumbItem,
    Checkbox,
    Radio,
    DropdownMenu,
    Dropdown,
    DropdownItem,
    Card,
    Row,
    Col,
    Pagination,
    Menu,
    MenuItem,
    InputNumber
    
} from 'element-ui'

Vue.prototype.$message = Message
Vue.use(InputNumber)
Vue.use(Message)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
// Vue.use(Message)
Vue.use(Input)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Checkbox)
Vue.use(Radio)
Vue.use(DropdownMenu)
Vue.use(Dropdown)
Vue.use(DropdownItem)
Vue.use(Card)
Vue.use(Row)
Vue.use(Col)
Vue.use(Pagination)