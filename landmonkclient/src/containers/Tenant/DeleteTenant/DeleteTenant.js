import React, { Component } from 'react';
import SuccessModal from '../../../components/Modals/SuccessModal/SuccessModal';
import ErrorModal from '../../../components/Modals/ErrorModal/ErrorModal';
import { connect } from 'react-redux';
import * as repositoryActions from '../../../store/actions/repositoryActions';
import * as errorHandlerActions from '../../../store/actions/errorHandlerActions';
import Logo from '../../../img/LandMonk-Logo---transparent-bkg---215x218.jpg'

class DeleteTenant extends Component {
    state = {
        tenantForm: {
            firstName: '',
            lastName: '',
            email: '',
            cellPhone: ''
        }
    }

    componentDidMount() {
        let id = this.props.match.params.id;
        let url = '/api/tenant/' + id;
        this.props.onGetTenantById(url, { ...this.props });
    }

    handleChangeEvent = (e) => {
        const deletedTenantForm = { ...this.state.tenantForm };
        deletedTenantForm[e.target.id] = e.target.value
        this.setState({ tenantForm: deletedTenantForm });
    }

    componentWillReceiveProps = (nextProps) => {
        const deletedTenantForm = { ...this.state.tenantForm };

        deletedTenantForm.firstName = nextProps.data.firstName;
        deletedTenantForm.lastName = nextProps.data.lastName;
        deletedTenantForm.email = nextProps.data.email;
        deletedTenantForm.cellPhone = nextProps.data.cellPhone;

        this.setState({ tenantForm: deletedTenantForm });
    }

    updateTenant = (event) => {
        event.preventDefault();

        const tenantToUpdate = {
            firstName: this.state.tenantForm.firstName,
            lastName: this.state.tenantForm.lastName,
            email: this.state.tenantForm.email,
            cellPhone: this.state.tenantForm.cellPhone,
        }

        const url = '/api/tenant/' + this.props.data.id;
        this.props.onUpdateTenant(url, tenantToUpdate, { ...this.props });
    }

    redirectToTenantList = () => {
        this.props.history.push('/tenants');
    }

    render() {
        return (
            <div className="wrapper">
                <div className="container-fluid">

                    {/* <!-- start page title --> */}
                    <div className="row">
                        <div className="col-12">
                            <div className="page-title-box">
                                <h4 className="page-title">Delete Tenant</h4>
                            </div>
                        </div>
                    </div>
                    {/* <!-- end page title --> */}


                    <div className="row">
                        <div className="col-8">
                            <div className="card">
                                <div className="card-body">
                                    <h4 className="header-title">Tenant Info</h4>

                                    <form onSubmit={e => this.updateTenant(e)}>
                                        <div className="form-row">
                                            <div className="form-group col-md-6">
                                                <label htmlFor="firstName" className="col-form-label">First Name</label>
                                                <input type="text" required
                                                    value={this.state.tenantForm.firstName} onChange={e => this.handleChangeEvent(e)} className="form-control" id="firstName" />
                                            </div>
                                            <div className="form-group col-md-6">
                                                <label htmlFor="lastName" className="col-form-label">Last Name</label>
                                                <input type="text" required
                                                    value={this.state.tenantForm.lastName} onChange={e => this.handleChangeEvent(e)} className="form-control" id="lastName" />
                                            </div>
                                        </div>

                                        <div className="form-row">
                                            <div className="form-group col-md-6">
                                                <label htmlFor="email" className="col-form-label">Email</label>
                                                <input type="text" required
                                                    value={this.state.tenantForm.email} onChange={e => this.handleChangeEvent(e)} className="form-control" id="email" />
                                            </div>
                                        </div>

                                        <div className="form-row">
                                            <div className="form-group col-md-6">
                                                <label htmlFor="cellPhone" className="col-form-label">Cell Phone</label>
                                                <input type="text" required
                                                    value={this.state.tenantForm.cellPhone} onChange={e => this.handleChangeEvent(e)} className="form-control" id="cellPhone" />
                                            </div>
                                        </div>

                                        <button className="btn btn-info waves-effect waves-light" onClick={this.redirectToTenantList}>Cancel</button>

                                        <button type="submit" className="btn btn-danger waves-effect waves-light deleteComponent">Delete</button>

                                    </form>

                                </div>
                            </div>
                        </div>
                        <div className="col-4">
                            <img src={Logo} alt="LandMonk" />
                        </div>
                    </div >

                    <SuccessModal show={this.props.showSuccessModal}
                        modalHeaderText={'Success!'}
                        modalBodyText={'Tenant Deleted'}
                        okButtonText={'OK'}
                        successClick={() => this.props.onCloseSuccessModal('/tenants', { ...this.props })} />

                    <ErrorModal show={this.props.showErrorModal}
                        modalHeaderText={'Error!'}
                        modalBodyText={this.props.errorMessage.title || this.props.errorMessage}
                        okButtonText={'OK'} closeModal={() => this.props.onCloseErrorModal()} />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        data: state.repository.data,
        showSuccessModal: state.repository.showSuccessModal,
        showErrorModal: state.errorHandler.showErrorModal,
        errorMessage: state.errorHandler.errorMessage
    }
}

const mapPropsToDispatch = dispatch => {
    return {
        onGetTenantById: (url, props) => dispatch(repositoryActions.getData(url, props)),
        onUpdateTenant: (url, tenant, props) => dispatch(repositoryActions.deleteData(url, tenant, props)),
        onCloseSuccessModal: (url, props) => dispatch(repositoryActions.closeSuccessModal(props, url)),
        onCloseErrorModal: () => dispatch(errorHandlerActions.closeErrorModal())
    }
}

export default connect(mapStateToProps, mapPropsToDispatch)(DeleteTenant);