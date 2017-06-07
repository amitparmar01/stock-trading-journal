import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';

class AddTrade extends Component {
    constructor() {
        super();
        
        this.state = {
            symbolValue: "",
            symbolError: "",
            priceValue: "",
            priceError: "",
            sharesValue: "",
            sharesError: "",
            profitTargetValue: "",
            profitTargetError: "",
            stopLossValue: "",
            stopLossError: "",
            dateValue: null,
            dateError: "",
            timeValue: null,
            timeError: "",
            commissionValue: "",
            commissionError: ""
        }

        this.styles = {
            main: {
                display: 'flex',
                flexFlow: 'row wrap'
            },
            field: {
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
        this.sharesChange = this.sharesChange.bind(this);
        this.profitTargetChange = this.profitTargetChange.bind(this);
        this.profitTargetFocusOut = this.profitTargetFocusOut.bind(this);
        this.stopLossChange = this.stopLossChange.bind(this);
        this.stopLossFocusOut = this.stopLossFocusOut.bind(this);
        this.dateChange = this.dateChange.bind(this);
        this.timeChange = this.timeChange.bind(this);
        this.commissionChange = this.commissionChange.bind(this);
        this.commissionFocusOut = this.commissionFocusOut.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.resetPage();
    }

    onClose() {
        this.resetPage();
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

    priceFocusOut(event) {
        var price = this.state.priceValue.replace(/^0+/, '');

        var value = this.normalizeDoubleValue(price);
        
        this.setState({ priceValue: value });
    }

    sharesChange(event, value) {
        var regex = /^[1-9]\d*$/;
        if (value.match(regex)) {
            this.setState({ sharesValue: value, sharesError: "" });
        }   
    }

    profitTargetChange(event, value) {
        var regex = /^\d*\.?\d{0,2}$/;
        if (value.match(regex)) {
            this.setState({ profitTargetValue: value, profitTargetError: "" });
        }
    }

    profitTargetFocusOut(event) {
        var profitTarget = this.state.profitTargetValue.replace(/^0+/, '');

        var value = this.normalizeDoubleValue(profitTarget);
        
        this.setState({ profitTargetValue: value });
    }

    stopLossChange(event, value) {
        var regex = /^\d*\.?\d{0,2}$/;
        if (value.match(regex)) {
            this.setState({ stopLossValue: value, stopLossError: "" });
        }
    }

    stopLossFocusOut(event) {
        var stopLoss = this.state.stopLossValue.replace(/^0+/, '');

        var value = this.normalizeDoubleValue(stopLoss);
        
        this.setState({ stopLossValue: value });
    }

    dateChange(event, value) {
        this.setState({ dateValue: value, dateError: "" });
    }

    timeChange(event, value) {
        this.setState({ timeValue: value, timeError: "" });
    }

    commissionChange(event, value) {
        var regex = /^\d*\.?\d{0,2}$/;
        if (value.match(regex)) {
            this.setState({ commissionValue: value, commissionError: "" });
        }
    }

    commissionFocusOut(event) {
        var commission = this.state.commissionValue.replace(/^0+/, '');

        var value = this.normalizeDoubleValue(commission);
        
        this.setState({ commissionValue: value });
    }

    normalizeDoubleValue(value) {
        if (value !== "") {
            if (value === ".") {
                value = "0.00";
            }
            else if (value.indexOf(".") === -1) {
                value += ".00";
            }
            
            if (value.startsWith(".")) {
                value = "0" + value;
            }
            else if (value.charAt(value.length - 1) === ".") {
                value += "00";
            }
            else if (value.charAt(value.length - 2) === ".") {
                value += "0";
            }
        }
        
        return value;
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
        var sharesErrorText = "";
        var profitTargetErrorText = "";
        var stopLossErrorText = "";
        var dateErrorText = "";
        var timeErrorText = "";
        var commissionErrorText = "";

        if (this.state.symbolValue === "") {
            symbolErrorText = "Symbol is required";
        }

        if (this.state.priceValue === "") {
            priceErrorText = "Price is required";
        }

        if (this.state.sharesValue === "") {
            sharesErrorText = "Shares is required";
        }

        if (this.state.profitTargetValue === "" && this.state.stopLossValue !== "") {
            profitTargetErrorText = "Profit Target is required when Stop Loss is set";
        }

        if (this.state.stopLossValue === "" && this.state.profitTargetValue !== "") {
            stopLossErrorText = "Stop Loss is required when Profit Target is set";
        }

        if (this.state.dateValue == null) {
            dateErrorText = "Date is required";
        }

        if (this.state.timeValue == null) {
            timeErrorText = "Time is required";
        }

        if (this.state.commissionValue === "") {
            commissionErrorText = "Commission is required";
        }

        if (symbolErrorText !== "" || priceErrorText !== "" || sharesErrorText !== "" || profitTargetErrorText !== "" || stopLossErrorText !== "" || 
            dateErrorText !== "" || timeErrorText !== "" || commissionErrorText !== "") {
            this.setState({ 
                symbolError: symbolErrorText, 
                priceError: priceErrorText, 
                sharesError: sharesErrorText, 
                profitTargetError: profitTargetErrorText,
                stopLossError: stopLossErrorText,
                dateError: dateErrorText,
                timeError: timeErrorText,
                commissionError: commissionErrorText
            });

            return false;
        }

        return true;
    }

    resetPage() {
        this.setState({ 
            symbolValue: "", 
            symbolError: "", 
            priceValue: "", 
            priceError: "", 
            sharesValue: "", 
            sharesError: "", 
            profitTargetValue: "", 
            profitTargetError: "",
            stopLossValue: "",
            stopLossError: "",
            dateValue: null,
            dateError: "",
            timeValue: null,
            timeError: "",
            commissionValue: "",
            commissionError: ""
        });
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
                        <TextField value={ this.state.symbolValue } floatingLabelText="Symbol" style={ this.styles.field } maxLength="10" onChange={ this.symbolChange } errorText={ this.state.symbolError } />
                        <TextField value={ this.state.priceValue } floatingLabelText="Price" hintText="0.00" style={ this.styles.field } onChange={ this.priceChange } onBlur={ this.priceFocusOut } errorText={ this.state.priceError } />
                        <TextField value={ this.state.sharesValue } floatingLabelText="Shares" style={ this.styles.field } onChange={ this.sharesChange } errorText={ this.state.sharesError } />
                        <TextField value={ this.state.profitTargetValue } floatingLabelText="Profit Target" hintText="0.00" style={ this.styles.field } onChange={ this.profitTargetChange } onBlur={ this.profitTargetFocusOut } errorText={ this.state.profitTargetError } />
                        <TextField value={ this.state.stopLossValue } floatingLabelText="Stop Loss" hintText="0.00" style={ this.styles.field } onChange={ this.stopLossChange } onBlur={ this.stopLossFocusOut } errorText={ this.state.stopLossError } />
                        <DatePicker value={ this.state.dateValue } floatingLabelText="Date" style={ this.styles.field } mode="landscape" onChange={ this.dateChange } errorText={ this.state.dateError } />
                        <TimePicker value={ this.state.timeValue } floatingLabelText="Time" style={ this.styles.field } onChange={ this.timeChange } errorText={ this.state.timeError } />

                        <TextField value={ this.state.commissionValue } floatingLabelText="Commission" hintText="0.00" style={ this.styles.field } onChange={ this.commissionChange } onBlur={ this.commissionFocusOut } errorText={ this.state.commissionError } />
                        <TextField value={ this.state.entryStrategyValue } floatingLabelText="Entry Strategy" fullWidth={ true } onChange={ this.entryStrategyChange } errorText={ this.state.entryStrategyError } />
                        <TextField value={ this.state.notesValue } floatingLabelText="Notes" style={ this.styles.textarea } maxLength="200" fullWidth={ true } multiLine={ true } rowsMax={ 3 } onChange={ this.notesChange } errorText={ this.state.notesError } />
                    </div>
                </Dialog>
            </div>
        );
    }
}

export default AddTrade;