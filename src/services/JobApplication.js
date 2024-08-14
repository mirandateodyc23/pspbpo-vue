import axios from 'axios';
import formatValue from '@/helpers/formatValue.js'

export default {
    async sendApplication(data) {
        try {
            let formData = new FormData();
            let toArray = ['qualification', 'language', 'career', 'character_ref', 'family'];
            let value = '';
            for (var key in data) {
                if(toArray.includes(key)) {
                    if(key != 'family'){
                        data[key].forEach((object_data, index) => {
                            Object.keys(object_data).map((object_data_key) => {
                                value = formatValue(data, data[key][index][object_data_key], key, object_data_key);
                                formData.append(`${key}[${index}][${object_data_key}]`, value);
                            });
                        });
                    }
                }
                else {
                    value = formatValue(data, data[key], key, null);
                    formData.append(key, value);
                }
            }
            // Get token
            const response_sess = await this.getToken();

            if (response_sess.status == 200 && response_sess.data.success) {
                // Submit to mail
                const bearer_axios = axios.create({
                    baseURL: process.env.VUE_APP_API_URL,
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "Authorization": 'Bearer ' + response_sess.data.access_token
                    },
                });
                const response = await bearer_axios.post('api/pspbpo/submit_application', formData);

                return response;

            } else {
                return response_sess;
            }

        } catch (err) {
            return err;
        }
    },
    async checkApplicationStatus(data) {
        try {
            axios.defaults.baseURL = process.env.VUE_APP_API_URL;
            let token = localStorage.getItem('t');
            if (token == null) {
                 // getting token 
                const response_token = await this.getToken();
                if(response_token.status == 200 && response_token.data.success) {
                    localStorage.setItem('t', response_token.data.access_token);
                    token = response_token.data.access_token;
                } else {
                    return response_token;
                }
            }
            axios.defaults.headers.common.Authorization = 'Bearer ' + token;
            let ref_code = localStorage.getItem('r');
            if(ref_code == null) {
                // checking for application
                const response_check_app = await axios.post('api/pspbpo/check_application', data);
                if(response_check_app.status == 200 && response_check_app.data.success && response_check_app.data.data.is_application_exist) {
                    localStorage.setItem('r', response_check_app.data.data.ref_code);
                    ref_code = response_check_app.data.data.ref_code;
                } else {
                    if(response_check_app.data.message == 'The token expired.') {
                        localStorage.removeItem('r');
                    }
                    localStorage.removeItem('t');
                    axios.defaults.headers.common.Authorization = '' ;
                    return response_check_app;
                }
            }
            // getting application info
            const response_view_app = await axios.post('api/pspbpo/view_application', {reference_code: ref_code});
            return response_view_app;
            
        } catch (err) {
            return err;
        }
    },
    async getFile(filename) {
        try {
            axios.defaults.baseURL = process.env.VUE_APP_API_URL;
            axios.defaults.headers.common.Authorization = 'Basic ' + btoa(process.env.VUE_APP_API_USER + ':' + process.env.VUE_APP_API_PASSWORD);

            const response = await axios.get('api/storage/' + filename);
            return response;
        } catch (err) {
            return err;
        }
    },
    async getToken() {
         try {
            axios.defaults.baseURL = process.env.VUE_APP_API_URL;
            axios.defaults.headers.common.Authorization = 'Basic ' + btoa(process.env.VUE_APP_API_USER + ':' + process.env.VUE_APP_API_PASSWORD);
            // getting token 
            const response_token = await axios.post('api/get_token');
            return response_token;
         } catch (err) {
            return err;
         }
    }
};
