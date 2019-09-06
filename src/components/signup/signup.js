import React, {PureComponent} from 'react';
import "../login/login.css";
import {Link, Redirect} from "react-router-dom";
import Avatar from '../../assets/images/user.png';
import {Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from 'yup';
import Image from 'react-bootstrap/Image';
import * as authAction from "../../redux/actions/auth";
import connect from "react-redux/es/connect/connect";
import propTypes from 'prop-types';
import Alert from "react-bootstrap/Alert";
import translate from "translatr";
import * as classNames from "classnames";
 class Signup extends PureComponent{
    constructor(props){
        super(props);
        this.checkTimeout = "";
    }
    render(){
        if(localStorage.getItem("user-name")){
            return <Redirect to="/" />
        }else{
            return (


                <Formik
                    initialValues={{
                        firstName:"",
                        lastName:"",
                        userName:"",
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
        this.props.loginStart({
            ID: 0,
            UserName: values.userName,
            Password: values.password
        });
        this.checkTimeout = setTimeout(()=>{
            if(!this.props.error){

                this.props.history.push("/");
                actions.setSubmitting(false);
            }else{
                actions.setFieldError("form","error")
            }
        },1000)

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
            <Form  className={formClasses}>
                <div className="form-group">
                    <label htmlFor="firstName">{translate( dictionary, currentLanguage, "register.fname" ) }</label>
                    <Field validate={Signup.nameValidator} name="firstName" type="text" className={'form-control' + (props.errors.firstName && props.touched.firstName ? ' is-invalid' : '')} />
                    <ErrorMessage name="firstName" component="div" className="invalid-feedback" />
                </div>
                <div className="form-group">
                    <label htmlFor="lastName">{translate( dictionary, currentLanguage, "register.lname" ) }</label>
                    <Field name="lastName" validate={Signup.nameValidator} type="text" className={'form-control' + (props.errors.lastName && props.touched.lastName ? ' is-invalid' : '')} />
                    <ErrorMessage name="lastName" component="div" className="invalid-feedback" />
                </div>
                <div className="form-group">
                    <label htmlFor="userName">{translate( dictionary, currentLanguage, "login.user-name" ) }</label>
                    <Field name="userName" type="text" className={'form-control' + (props.errors.userName && props.touched.userName ? ' is-invalid' : '')} />
                    <ErrorMessage name="userName" component="div" className="invalid-feedback" />
                </div>
                <div className="form-group">
                    <label htmlFor="password">{translate( dictionary, currentLanguage, "login.password" ) }</label>
                    <Field name="password" validate={Signup.passwordValidator} type="password" className={'form-control' + (props.errors.password && props.touched.password ? ' is-invalid' : '')} />
                    <ErrorMessage name="password" component="div" className="invalid-feedback" />
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPassword">{translate( dictionary, currentLanguage, "register.conf" ) }</label>
                    <Field name="confirmPassword" type="password" className={'form-control' + (props.errors.confirmPassword && props.touched.confirmPassword ? ' is-invalid' : '')} />
                    <ErrorMessage name="confirmPassword" component="div" className="invalid-feedback" />
                </div>
                <div className="form-group">
                    <Link to="/login">{translate( dictionary, currentLanguage, "register.member" ) }</Link>
                </div>

                <div className="form-group">
                    <button type="submit" className="btn btn-primary mr-2" disabled={props.isSubmitting}>{translate( dictionary, currentLanguage, "register.register" ) }</button>
                    <button type="reset" className="btn btn-secondary">{translate( dictionary, currentLanguage, "register.reset" ) }</button>
                </div>
            </Form>
            {props.errors.form &&
            <Alert variant="danger">
                {translate( dictionary, currentLanguage, "error.first-part" ) } {translate( dictionary, currentLanguage, "error.last-part" ) }
            </Alert>
            }
        </div>
        )
    };

    schema = ()=>{
        let required = 'required field';
        if(localStorage.getItem('lang') === 'ar-AR') {
            required = 'مطلوب';
        }
            const schema_ = Yup.object().shape({
            firstName: Yup.string().required(required).label().min(2, "too short"),
            lastName: Yup.string().required(required).label().min(2, "too short"),
            userName: Yup.string().required(required),
            password: Yup.string().required(required).label("password").min("8"),
            confirmPassword: Yup.string().required(required).test('passwords-match', 'Passwords not matched', function(value) {
                return this.parent.password === value;
            })
        });
        return schema_;
    };

    componentWillUnmount() {
        clearTimeout(this.checkTimeout);
    }

 }
function mapStateToProps(state) {
    return{
        username: state.auth.username,
        password: state.auth.password,
        error: state.auth.error,
        currentLanguage: state.i18n.currentLanguage,
        dictionary: state.i18n.dictionaries[ state.i18n.currentLanguage ]
    }
}
const mapDispatchToProps = {
    loginStart: authAction.loginStart,
};

export default connect(mapStateToProps,mapDispatchToProps)(Signup);

Signup.propTypes = {
    userName: propTypes.string,
    password: propTypes.string,
    error: propTypes.string,
    loginStart: propTypes.func,
    currentLanguage: propTypes.string,
    dictionary: propTypes.object
};
