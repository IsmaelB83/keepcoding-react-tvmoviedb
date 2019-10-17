// Node modules
import React, { Component } from 'react';
import { withSnackbar } from 'notistack';
// Material-UI
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import CakeIcon from '@material-ui/icons/Cake';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
// Own modules
import LocalStorage from '../../utils/Storage';
import MovieDbAPI from '../../services/MovieDbAPI';
import UserConsumer from '../../context/UserContext';
// Assets
import imageLogo from '../../assets/images/moviedb.png';
// CSS styles
import './Register.css';

/**
 * Register Form
 */
class Register extends Component {
  
  /**
   * Uso del contexto en el cualquier metodo del componente 
   */ 
  static contextType = UserConsumer;

  /**
   * Constructor
   */
  constructor(props) {
    super(props);
    this.state = {
      showPassword: false,
      isRemember: false,
      name: '',
      surname: '',
      birthday: null,
      api_key: ''
    }
  }

  /**
   * Did mount
   */
  componentDidMount() {
    const session = this.context.session;
    if (session) {
      this.setState({
        name: session.name,
        surname: session.surname,
        birthday: session.birthday,
        api_key: session.api_key,
      });
    }
  }

  /**
   * Render
   */
  render() {   
    return (
      <div className='Login'>
        <div className='Login__Wrapper'>
          <form className='Login__Form' onSubmit={this.handleOnSubmit}>
            <img src={imageLogo} className='Login__Logo' alt='nodepop-logo' />
            <FormControl>
              <Input
                name='name'
                value={this.state.name}
                onChange={this.handleInput('name')}
                type='text' 
                placeholder='type your name'
                autoComplete='username'
                startAdornment={
                  <InputAdornment position='start' className='InputIcon-icon'>
                    <AccountCircleIcon/>
                  </InputAdornment>
                }
                endAdornment={this.props.endAdornment}
                required={this.props.required}
              />
            </FormControl>
            <FormControl>
              <Input
                name='surname'
                value={this.state.surname}
                onChange={this.handleInput('surname')}
                type='text' 
                placeholder='type your surname'
                startAdornment={
                  <InputAdornment position='start' className='InputIcon-icon'>
                    <AccountCircleIcon/>
                  </InputAdornment>
                }
                endAdornment={this.props.endAdornment}
                required={this.props.required}
              />
            </FormControl>
            <FormControl>
              <Input
                name='birthday'
                value={this.state.birthday || ''}
                onChange={this.handleInput('birthday')}
                type='date' 
                placeholder='type your birthdate'
                startAdornment={
                  <InputAdornment position='start' className='InputIcon-icon'>
                    <CakeIcon/>
                  </InputAdornment>
                }
                endAdornment={this.props.endAdornment}
                required
              />
            </FormControl>
            <FormControl>
              <Input 
                name='api_key'
                autoComplete="current-password"
                value={this.state.api_key}
                onChange={this.handleInput('api_key')}
                placeholder='type your api key' 
                type={this.state.showPassword ? 'text' : 'password'}
                startAdornment={
                  <InputAdornment position='start' className='InputIcon-icon'>
                    <LockOpenIcon />
                  </InputAdornment>
                }
                required
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton
                      edge='end'
                      aria-label='toggle password visibility'
                      onClick={this.handleClickShowPassword}
                    >
                      {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <FormControlLabel
              name='isRemember'
              label='remember me'
              control={
                <Checkbox
                    color='primary'
                    checked={this.state.isRemember}
                    onChange={this.handleCheckbox('isRemember')}
                />
              }
            />
            <Button className='button' type='submit' variant='contained' color='primary'> Login </Button>
          </form>
        </div>
      </div>
    );
  }

  /**
   * Handle onSubmit event
   */
  handleOnSubmit = (event) => {
    event.preventDefault();
    // Creo el objeto session desde el formulario
    const { name, surname, birthday, api_key } = {...this.state};
    const session = { name, surname, birthday, api_key };
    // Checkeo la API-KEY
    const apiService = new MovieDbAPI(session.api_key) 
    apiService.checkApìKey().then(result => {
      // La API-KEY es válida
      if (result) {
        // Guardo en local storage en caso de haberlo seleccionado
        if (this.state.isRemember) {
          LocalStorage.saveLocalStorage(session);
        }
        // Actualizo el contexto y redijo el home
        this.context.session = session;
        this.props.history.push('/');
      } else {
        this.props.enqueueSnackbar('API-KEY incorrecta', { variant: 'error' });
        this.setState({showPassword: true});
      }
    });
  }

  /**
   * Cambio en un input tipo check
   */
  handleCheckbox = (field) => (event) => {
    this.setState({
      [field]: event.target.checked
    });
  };

  /**
   * Cambio en un input tipo texto
   */
  handleInput = (field) => (event) => {
    this.setState({
      [field]: event.target.value 
    });
  }

  /**
   * Show/Hide input content
   */
  handleClickShowPassword = () => {
    this.setState({
      showPassword: !this.state.showPassword 
    });
  };
}

export default withSnackbar(Register);