import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';

class AddTrade extends Component {
    constructor() {
        super();
        
        this.state = {
            symbolValue: "",
            symbolError: "",
            priceValue: "",
            priceError: ""
        }

        this.styles = {
            main: {
                display: 'flex',
                flexFlow: 'row wrap'
            },
            textbox: {
                marginRight: 80
            },
            textarea: {
                resize: 'none'
            }
        };

        this.onClose = this.onClose.bind(this);
        this.resetPage = this.resetPage.bind(this);
        this.onAdd = this.onAdd.bind(this);
        this.onSaveAndAdd = this.onSaveAndAdd.bind(this);
        this.validatePage = this.validatePage.bind(this);
        this.symbolChange = this.symbolChange.bind(this);
        this.priceChange = this.priceChange.bind(this);
        this.priceFocusOut = this.priceFocusOut.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.resetPage();
    }

    onClose() {
        this.props.onClose();
    }

    symbolChange(event, value) {
        var upperValue = value.toUpperCase();
        this.setState({ symbolValue: upperValue, symbolError: "" });
    }

    priceChange(event, value) {
        var regex = /^\d*\.?\d{0,2}$/;
        if (value.match(regex)) {
            this.setState({ priceValue: value, priceError: "" });
        }        
    }

    priceFocusOut() {
        var price = this.state.priceValue.replace(/^0+/, '');

        if (price === ".") {
            price = "0.00";
        }
        else if (price.indexOf(".") === -1) {
            price += ".00";
        }
        
        if (price.startsWith(".")) {
            price = "0" + price;
        }
        else if (price.charAt(price.length - 1) === ".") {
            price += "00";
        }
        else if (price.charAt(price.length - 2) === ".") {
            price += "0";
        }
        
        this.setState({ priceValue: price });
    }

    onAdd() {
        var isPageValid = this.validatePage();

        if (isPageValid) {
            //TradeActions.Add(this.state.symbolValue, this.state.priceValue);
            this.onClose();
        }
    }

    onSaveAndAdd() {
        var isPageValid = this.validatePage();

        if (isPageValid) {
            //TradeActions.Add(this.state.symbolValue, this.state.priceValue);
            this.resetPage();
        }
    }

    validatePage() {
        var symbolErrorText = "";
        var priceErrorText = "";

        if (this.state.symbolValue === "") {
            symbolErrorText = "Symbol is required";
        }

        if (this.state.priceValue === "") {
            priceErrorText = "Price is required";
        }

        if (symbolErrorText !== "" || priceErrorText !== "") {
            this.setState({ symbolError: symbolErrorText, priceError: priceErrorText });

            return false;
        }

        return true;
    }

    resetPage() {
        this.setState({ symbolValue: "", symbolError: "", priceValue: "", priceError: "" });
    }

    render() {
        const actions = [
            <FlatButton label="Cancel" primary={ true } onTouchTap={ this.onClose } />,
            <FlatButton label="Save and add more" primary={ true } onTouchTap={ this.onSaveAndAdd } />,
            <FlatButton label="Add" primary={ true } onTouchTap={ this.onAdd } />
        ];

        return (
            <div>
                <Dialog title="Add new trade" modal={ true } actions={ actions } open={ this.props.Open } onRequestClose={ this.onClose }>
                    <div style={ this.styles.main }>
                        <TextField value={ this.state.symbolValue } floatingLabelText="Symbol" style={ this.styles.textbox } maxLength="10" onChange={ this.symbolChange } errorText={ this.state.symbolError } />
                        <TextField value={ this.state.priceValue } floatingLabelText="Price" hintText="0.00" style={ this.styles.textbox } onChange={ this.priceChange } onBlur={ this.priceFocusOut } errorText={ this.state.priceError } />
                        <TextField value={ this.state.sharesValue } floatingLabelText="Shares" style={ this.styles.textbox } onChange={ this.sharesChange } errorText={ this.state.sharesError } />
                        <TextField value={ this.state.profitTargetValue } floatingLabelText="Profit target" hintText="0.00" style={ this.styles.textbox } onChange={ this.profitTargetChange } errorText={ this.state.profitTargetError } />
                        <TextField value={ this.state.stopLossValue } floatingLabelText="Stop Loss" hintText="0.00" style={ this.styles.textbox } onChange={ this.stopLossChange } errorText={ this.state.stopLossError } />
                        <TextField value={ this.state.dateValue } floatingLabelText="Date" style={ this.styles.textbox } onChange={ this.dateChange } errorText={ this.state.dateError } />
                        <TextField value={ this.state.timeValue } floatingLabelText="Time" style={ this.styles.textbox } onChange={ this.timeChange } errorText={ this.state.timeError } />
                        <TextField value={ this.state.commissionValue } floatingLabelText="Commission" hintText="0.00" style={ this.styles.textbox } onChange={ this.commissionChange } errorText={ this.state.commissionError } />
                        <TextField value={ this.state.entryStrategyValue } floatingLabelText="Entry Strategy" fullWidth={ true } onChange={ this.entryStrategyChange } errorText={ this.state.entryStrategyError } />
                        <TextField value={ this.state.notesValue } floatingLabelText="Notes" style={ this.styles.textarea } maxLength="200" fullWidth={ true } multiLine={ true } rowsMax={ 3 } onChange={ this.notesChange } errorText={ this.state.notesError } />
                    </div>
                </Dialog>
            </div>
        );
    }
}

export default AddTrade;