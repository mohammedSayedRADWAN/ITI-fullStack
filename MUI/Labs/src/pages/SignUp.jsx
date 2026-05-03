import React, { useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  FormLabel,
  FormControl,
  Link,
  TextField,
  Typography,
  Stack,
  Card,
  Container,
  Radio,
  RadioGroup,
  FormGroup,
  Select,
  MenuItem,
  InputLabel,
  Grid,
} from '@mui/material';
import { styled } from '@mui/material/styles';

/**
 * Senior Frontend Engineer Refactor:
 * - Controlled inputs for all MUI components
 * - Semantic form structure using MUI composition patterns
 * - Accessible and performant state management
 */

// --- Styled Components (MUI System) ---

const CustomButton = styled(Button)(({ theme }) => ({
  borderRadius: '8px',
  textTransform: 'none',
  fontWeight: 600,
  padding: '10px 20px',
  transition: theme.transitions.create(['background-color', 'box-shadow', 'transform', 'border-color'], {
    duration: theme.transitions.duration.shorter,
  }),
}));

const PrimaryButton = styled(CustomButton)(({ theme }) => ({
  background: 'linear-gradient(180deg, #1c2025 0%, #08090a 100%)',
  color: '#FFFFFF',
  border: '1px solid #1c2025',
  '&:hover': {
    background: '#333b4d',
    backgroundImage: 'none',
    boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
    transform: 'translateY(-1px)',
    borderColor: '#2b3445',
  },
  '&:active': { transform: 'translateY(0)' },
}));

const SocialButton = styled(CustomButton)(({ theme }) => ({
  borderColor: '#E5EAF2',
  color: '#001E3C',
  '&:hover': { borderColor: '#BDBDBD', background: '#F9FAFB' },
}));

// --- Pure Icons (Manual SVG for stability) ---

const GoogleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.84z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
  </svg>
);

const FacebookIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="#1877F2">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const Logo = () => (
  <Stack direction="row" spacing={1} alignItems="center" mb={3}>
    <Box sx={{ width: 32, height: 32, borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #007FFF 0%, #0059B2 100%)', color: '#fff' }}>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z" />
      </svg>
    </Box>
    <Typography variant="h6" component="span" sx={{ fontWeight: 700, color: '#001E3C', letterSpacing: '-0.5px' }}> Sitemark </Typography>
  </Stack>
);

// --- Component Definition ---

export default function SignUp() {
  // 1. Initial State Handling
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: '',
    skills: [],
    location: '',
  });

  const [errors, setErrors] = useState({});

  // 2. Constants
  const skillOptions = ['JavaScript', 'React', 'Node.js', 'Material UI'];
  const locations = ['North America', 'Europe', 'Asia', 'Middle East', 'Africa', 'Other'];

  // 3. Handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSkillChange = (e) => {
    const { value, checked } = e.target;
    setFormValues((prev) => ({
      ...prev,
      skills: checked
        ? [...prev.skills, value]
        : prev.skills.filter((skill) => skill !== value),
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formValues.name) newErrors.name = 'Full name is required';
    if (!formValues.email || !/\S+@\S+\.\S+/.test(formValues.email)) newErrors.email = 'Valid email is required';
    if (!formValues.password || formValues.password.length < 6) newErrors.password = 'Password must be at least 6 chars';
    if (formValues.password !== formValues.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    if (!formValues.gender) newErrors.gender = 'Please select a gender';
    if (!formValues.location) newErrors.location = 'Please select a location';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log('Production Ready Form Data:', formValues);
      alert('Signup Successful!');
    }
  };

  return (
    <Container component="main" maxWidth="sm">
      <Stack
        justifyContent="center"
        alignItems="center"
        sx={{ 
          minHeight: '100vh', 
          py: 6, 
          background: 'radial-gradient(circle at 50% 120%, rgba(0, 127, 255, 0.05), transparent)' 
        }}
      >
        <Card
          sx={{
            p: { xs: 3, sm: 5 },
            width: '100%',
            maxWidth: 520,
            borderRadius: 4,
            boxShadow: '0px 10px 40px rgba(0, 0, 0, 0.08)',
            border: '1px solid #E5EAF2',
            background: '#FFFFFF',
          }}
        >
          <Logo />
          
          <Typography variant="h4" sx={{ fontWeight: 800, mb: 3, color: '#001E3C', letterSpacing: '-1px' }}>
            Create Account
          </Typography>

          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            
            <TextField
              label="Full Name"
              name="name"
              placeholder="Jon Snow"
              value={formValues.name}
              onChange={handleChange}
              error={Boolean(errors.name)}
              helperText={errors.name}
              fullWidth
              size="small"
              required
            />

            <TextField
              label="Email Address"
              name="email"
              type="email"
              placeholder="your@email.com"
              value={formValues.email}
              onChange={handleChange}
              error={Boolean(errors.email)}
              helperText={errors.email}
              fullWidth
              size="small"
              required
            />

            <TextField
              label="Password"
              name="password"
              type="password"
              placeholder="••••••"
              value={formValues.password}
              onChange={handleChange}
              error={Boolean(errors.password)}
              helperText={errors.password}
              fullWidth
              size="small"
              required
            />

            <TextField
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              placeholder="••••••"
              value={formValues.confirmPassword}
              onChange={handleChange}
              error={Boolean(errors.confirmPassword)}
              helperText={errors.confirmPassword}
              fullWidth
              size="small"
              required
            />

            {/* Section 2: Gender Selection (RadioGroup) */}
            <FormControl error={Boolean(errors.gender)} component="fieldset">
              <FormLabel sx={{ fontWeight: 600, mb: 1, fontSize: '0.875rem' }}>Gender</FormLabel>
              <RadioGroup row name="gender" value={formValues.gender} onChange={handleChange}>
                <FormControlLabel value="male" control={<Radio size="small" />} label="Male" />
                <FormControlLabel value="female" control={<Radio size="small" />} label="Female" />
                <FormControlLabel value="other" control={<Radio size="small" />} label="Other" />
              </RadioGroup>
              {errors.gender && <Typography variant="caption" color="error">{errors.gender}</Typography>}
            </FormControl>

            {/* Section 3: Skills selection (Checkboxes) */}
            <FormControl component="fieldset">
              <FormLabel sx={{ fontWeight: 600, mb: 1, fontSize: '0.875rem' }}>Skills</FormLabel>
              <FormGroup row>
                {skillOptions.map((skill) => (
                  <FormControlLabel
                    key={skill}
                    control={
                      <Checkbox
                        size="small"
                        value={skill}
                        checked={formValues.skills.includes(skill)}
                        onChange={handleSkillChange}
                      />
                    }
                    label={<Typography variant="body2">{skill}</Typography>}
                  />
                ))}
              </FormGroup>
            </FormControl>

            {/* Section 4: Location field (Select Dropdown) */}
            <FormControl fullWidth size="small" error={Boolean(errors.location)}>
              <InputLabel id="location-label">Region / Location</InputLabel>
              <Select
                labelId="location-label"
                name="location"
                value={formValues.location}
                label="Region / Location"
                onChange={handleChange}
              >
                {locations.map((loc) => (
                  <MenuItem key={loc} value={loc}>{loc}</MenuItem>
                ))}
              </Select>
              {errors.location && <Typography variant="caption" color="error" sx={{ mt: 0.5 }}> {errors.location} </Typography>}
            </FormControl>

            {/* Submit Action */}
            <PrimaryButton type="submit" variant="contained" fullWidth sx={{ mt: 1 }}>
              Sign up
            </PrimaryButton>
          </Box>

          <Divider sx={{ my: 4 }}>
            <Typography variant="body2" sx={{ color: '#667C89', px: 1 }}>or continue with</Typography>
          </Divider>

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <SocialButton variant="outlined" fullWidth startIcon={<GoogleIcon />}>Google</SocialButton>
            </Grid>
            <Grid item xs={6}>
              <SocialButton variant="outlined" fullWidth startIcon={<FacebookIcon />}>Facebook</SocialButton>
            </Grid>
          </Grid>

          <Typography variant="body2" sx={{ mt: 4, textAlign: 'center', color: '#667C89' }}>
            Already have an account?{' '}
            <Link href="#" sx={{ fontWeight: 700, color: '#007FFF', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}> Sign in </Link>
          </Typography>
        </Card>
      </Stack>
    </Container>
  );
}
