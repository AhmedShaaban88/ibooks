import React, {PureComponent} from 'react';
import {ErrorMessage, Field, Form, Formik} from "formik";
import {Redirect} from "react-router-dom";
import Image from "react-bootstrap/Image";
import Avatar from "../../assets/images/user.png";
import * as Yup from "yup";
import connect from "react-redux/es/connect/connect";
import propTypes from "prop-types";
import translate from "translatr";
import * as classNames from "classnames";


class Settings extends PureComponent{
    render(){
        if(!localStorage.getItem("user-name")){
            return <Redirect to="/" />
        }else{
            return (


                <Formik
                    initialValues={{
                        firstName:localStorage.getItem("fname") || "",
                        lastName:localStorage.getItem("lname")|| "",
                        userName:localStorage.getItem("user-name")|| "",
                        password: "",
                        confirmPassword: "",
                    }}
                    onSubmit={this.submit}
                    render={this.form}
                    validationSchema={this.schema()}
                />

            )
        }
    }
    submit = (values, actions)=>{
        setTimeout(()=>{
            actions.setSubmitting(false)
        },10000);
        localStorage.setItem("fname",values.firstName);
        localStorage.setItem("lname",values.lastName);
        localStorage.setItem("user-name",values.userName);
        this.props.history.push("/");

    };
    static nameValidator(value){
        let error;
        if (!(/^[a-zA-Z]{2,}$/).test(value)) {
            if(localStorage.getItem('lang') === 'ar-AR'){
                error = 'حروف فقط';
            }else{
                error = 'Must be only letters';
            }
        }
        return error;
    }
    static passwordValidator(value){
        let error;
        if(!(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/).test(value)){
            if(localStorage.getItem('lang') === 'ar-AR'){
                error= 'علي الاقل 8 احرف بينهم حرف ورقم';
            }else{
                error="Minimum eight characters, at least one letter and one number";

            }
        }
        return error;
    }
    form = (props)=> {
        const {dictionary, currentLanguage} = this.props;
        const formClasses = classNames({
            'main-form': true,
            'text-right': localStorage.getItem('lang') === 'ar-AR',
            'text-left': localStorage.getItem('lang') !== 'ar-AR',
        });
        return(

            <div className="wrapper">
                <Image alt="user-image" className="rounded-circle register-img" src={Avatar}/>
                <Form className={formClasses}>
                    <div className="form-group">
                        <label htmlFor="firstName">{translate( dictionary, currentLanguage, "register.fname" ) }</label>
                        <Field validate={Settings.nameValidator} name="firstName" type="text" className={'form-control' + (props.errors.firstName && props.touched.firstName ? ' is-invalid' : '')} />
                        <ErrorMessage name="firstName" component="div" className="invalid-feedback" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastName">{translate( dictionary, currentLanguage, "register.lname" ) }</label>
                        <Field name="lastName" validate={Settings.nameValidator} type="text" className={'form-control' + (props.errors.lastName && props.touched.lastName ? ' is-invalid' : '')} />
                        <ErrorMessage name="lastName" component="div" className="invalid-feedback" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="userName">{translate( dictionary, currentLanguage, "login.user-name" ) }</label>
                        <Field name="userName" type="text" className={'form-control' + (props.errors.userName && props.touched.userName ? ' is-invalid' : '')} />
                        <ErrorMessage name="userName" component="div" className="invalid-feedback" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">{translate( dictionary, currentLanguage, "register.new" ) }</label>
                        <Field name="password" validate={Settings.passwordValidator} type="password" className={'form-control' + (props.errors.password && props.touched.password ? ' is-invalid' : '')} />
                        <ErrorMessage name="password" component="div" className="invalid-feedback" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirmPassword">{translate( dictionary, currentLanguage, "register.conf" ) }</label>
                        <Field name="confirmPassword" type="password" className={'form-control' + (props.errors.confirmPassword && props.touched.confirmPassword ? ' is-invalid' : '')} />
                        <ErrorMessage name="confirmPassword" component="div" className="invalid-feedback" />
                    </div>

                    <div className="form-group">
                        <button type="submit" className="btn btn-primary mr-2" disabled={props.isSubmitting}>{translate( dictionary, currentLanguage, "register.update" ) }</button>
                        <button type="reset" className="btn btn-secondary">{translate( dictionary, currentLanguage, "register.reset" ) }</button>
                    </div>
                </Form>

            </div>
        )
    };

    schema = ()=>{
        let required = 'required field';
        if(localStorage.getItem('lang') === 'ar-AR') {
            required = 'مطلوب';
        }
        return Yup.object().shape({
            firstName: Yup.string().required(required).label("first name is required").min(2, "too short"),
            lastName: Yup.string().required(required).label("last name is required").min(2, "too short"),
            userName: Yup.string().required(required),
            password: Yup.string().required(required).label("password").min("8"),
            confirmPassword: Yup.string().required(required).test('passwords-match', 'Passwords not matched', function (value) {
                return this.parent.password === value;
            })
        });
    };

}
function mapStateToProps(state) {
    return{
        currentLanguage: state.i18n.currentLanguage,
        dictionary: state.i18n.dictionaries[ state.i18n.currentLanguage ]
    }
}

export default connect(mapStateToProps)(Settings);

Settings.propTypes = {
    currentLanguage: propTypes.string,
    dictionary: propTypes.object
};
