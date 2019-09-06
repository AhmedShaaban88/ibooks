import React, {PureComponent} from 'react';
import {Link, Redirect} from "react-router-dom";
import "./login.css";
import {ErrorMessage,Form ,Field, Formik} from "formik";
import Image from "react-bootstrap/Image";
import Avatar from "../../assets/images/user.png";
import * as authAction from "../../redux/actions/auth";
import connect from "react-redux/es/connect/connect";
import propTypes from 'prop-types';
import Alert from "react-bootstrap/Alert";
import translate from "translatr";
import * as classNames from 'classnames';
class Login extends PureComponent{
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
                        userName:"",
                        password: "",
                    }}
                    onSubmit={this.submit}
                    render={this.form}
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
               this.checkTimeout=  setTimeout(()=>{
                    if(!this.props.error){
                        this.props.history.push("/");
                        actions.setSubmitting(false);
                    }else{
                        actions.setFieldError("form","error");
                    }
                },1000)


    };
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
                        <label htmlFor="userName">{translate( dictionary, currentLanguage, "login.user-name" ) }</label>
                        <Field name="userName" type="text" className={'form-control' + (props.errors.userName && props.touched.userName ? ' is-invalid' : '')} />
                        <ErrorMessage name="userName" component="div" className="invalid-feedback" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">{translate( dictionary, currentLanguage, "login.password" ) }</label>
                        <Field name="password" type="password" className={'form-control' + (props.errors.password && props.touched.password ? ' is-invalid' : '')} />
                        <ErrorMessage name="password" component="div" className="invalid-feedback" />
                    </div>
                    <div className="form-group">
                        <Link to="/signup">{translate( dictionary, currentLanguage, "login.become" ) }</Link>
                    </div>

                    <div className="form-group">
                        <button type="submit" className="btn btn-primary mr-2" disabled={props.isSubmitting}>{translate( dictionary, currentLanguage, "login.login" ) }</button>
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

export default connect(mapStateToProps,mapDispatchToProps)(Login);

Login.propTypes = {
    userName: propTypes.string,
    password: propTypes.string,
    error: propTypes.string,
    loginStart: propTypes.func,
    currentLanguage: propTypes.string,
    dictionary: propTypes.object
};
