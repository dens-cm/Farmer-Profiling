import { extendTheme } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'

const theme = extendTheme({
    initialColorMode: 'light',
    useSystemColorMode: false,
    colors: {
        light: {
            base: '#F4F4F2',
            primary: '#E8E8E8',
            highlight: '#00ADB5',
            accent: '#495464',
            placeholder: '#b0b3b5',
            hover: '#dddddd',
            warning: '#EA5455'
        },
        dark: {
            base: '#222831',
            primary: '#393E46',
            highlight: '#00ADB5',
            accent: '#EEEEEE',
            placeholder: '#b0b3b5',
            hover: '#474c54',
            warning: '#EA5455'
        }
    },
    fontSizes: {
        xs: '.7vw',
        sm: '.8vw',
        md: '.9vw',
        lg: '1vw',
        xl: '1.5vw',
        xxl: '2vw'
    },
    components: {
        Heading: {
            defaultProps: {
                variant: 'title'
            },
            variants: {
                title: (props) => ({
                    color: mode('light.accent', 'dark.accent')(props),
                    fontSize: 'lg',
                    textTransform: 'uppercase'
                }),
                content: (props) => ({
                    color: mode('light.accent', 'dark.accent')(props),
                    fontSize: 'md'
                })
            }
        },
        Text: {
            defaultProps: {
                variant: 'body'
            },
            variants: {
                body: (props) => ({
                    color: mode('light.accent', 'dark.accent')(props),
                    fontSize: 'md'
                }),
                muted: (props) => ({
                    color: mode('light.accent', 'dark.accent')(props),
                    fontSize: 'sm'
                }),
                highlight: (props) => ({
                    color: mode('light.highlight', 'dark.highlight')(props),
                    fontSize: 'md',
                    fontWeight: '700'
                }),
                caption: (props) => ({
                    color: mode('light.accent', 'dark.accent')(props),
                    fontSize: 'sm',
                    fontStyle: 'italic',
                }),
                error: (props) => ({
                    color: mode('light.warning', 'dark.warning')(props),
                    fontSize: 'sm',
                    fontWeight: '700'
                })
            }
        },
        Input: {
            defaultProps: {
                variant: 'filled'
            },
            variants: {
                filled: (props) => ({
                    field: {
                        height: '2.2vw',
                        color: mode('light.accent', 'dark.accent')(props),
                        fontSize: 'sm',
                        bg: mode('light.primary', 'dark.primary')(props),
                        borderRadius: '.7vw',
                        _focus: {
                            bg: mode('light.hover', 'dark.hover')(props),
                            color: mode('light.accent', 'dark.accent')(props)
                        },
                        _hover: {
                            bg: mode('light.hover', 'dark.hover')(props),
                            color: mode('light.accent', 'dark.accent')(props)
                        },
                        _placeholder: {
                            color: mode('light.placehoder', 'dark.placeholder')(props)
                        }
                    }
                })
            }
        },
        Button: {
            defaultProps: {
                variant: 'highlight'
            },
            variants: {
                primary: (props) => ({
                    height: '2.2vw',
                    color: mode('light.accent', 'dark.accent')(props),
                    fontSize: 'sm',
                    bg: mode('light.primary', 'dark.primary')(props),
                    borderRadius: '.7vw',
                    transition: '.3s',
                    _hover: {
                        bg: mode('light.accent', 'dark.accent')(props),
                        color: mode('light.primary', 'dark.primary')(props),
                        transition: '.3s'
                    }
                }),
                highlight: (props) => ({
                    height: '2.2vw',
                    color: mode('light.primary', 'dark.accent')(props),
                    fontSize: 'sm',
                    bg: mode('light.highlight', 'dark.highlight')(props),
                    borderRadius: '.7vw',
                    transition: '.3s',
                    _hover: {
                        bg: mode('light.primary', 'dark.accent')(props),
                        color: mode('light.highlight', 'dark.highlight')(props),
                        transition: '.3s'
                    }
                }),
                accent: (props) => ({
                    height: '2.2vw',
                    color: mode('light.primary', 'dark.primary')(props),
                    fontSize: 'sm',
                    bg: mode('light.accent', 'dark.accent')(props),
                    borderRadius: '.7vw',
                    transition: '.3s',
                    _hover: {
                        bg: mode('light.primary', 'dark.primary')(props),
                        color: mode('light.accent', 'dark.accent')(props),
                        transition: '.3s'
                    }
                }),
                warning: (props) => ({
                    height: '2.2vw',
                    color: mode('light.primary', 'dark.primary')(props),
                    fontSize: 'sm',
                    bg: mode('light.warning', 'dark.warning')(props),
                    borderRadius: '.7vw',
                    transition: '.3s',
                    _hover: {
                        bg: mode('light.primary', 'dark.primary')(props),
                        color: mode('light.accent', 'dark.accent')(props),
                        transition: '.3s'
                    }
                }),
                transparent: (props) => ({
                    height: '2.2vw',
                    color: mode('light.accent', 'dark.accent')(props),
                    fontSize: 'sm',
                    bg: 'none',
                    borderRadius: '.7vw',
                    transition: '.3s',
                    _hover: {
                        bg: mode('light.accent', 'dark.accent')(props),
                        color: mode('light.primary', 'dark.primary')(props),
                        transition: '.3s'
                    }
                }),
                activeTransparent: (props) => ({
                    height: '2.2vw',
                    color: mode('light.primary', 'dark.primary')(props),
                    fontSize: 'sm',
                    bg: mode('light.accent', 'dark.accent')(props),
                    borderRadius: '.7vw',
                    transition: '.3s',
                    _hover: {
                        bg: mode('light.accent', 'dark.accent')(props),
                        color: mode('light.primary', 'dark.primary')(props),
                        transition: '.3s'
                    }
                })
            }
        },
        Icon: {
            baseStyle: {
                strokeWidth: '.1vw',
                fontSize: '1.2vw'
            }
        },
        Select: {
            defaultProps: {
                variant: 'filled'
            },
            variants: {
                filled: (props) => ({
                    field: {
                        height: '2.2vw',
                        color: mode('light.accent', 'dark.accent')(props),
                        fontSize: 'sm',
                        borderRadius: '.7vw',
                        display: 'flex',
                        cursor: 'pointer',
                        bg: mode('light.primary', 'dark.primary')(props),
                        _focus: {
                            bg: mode('light.hover', 'dark.hover')(props),
                            color: mode('light.accent', 'dark.accent')(props)
                        },
                        _hover: {
                            bg: mode('light.hover', 'dark.hover')(props),
                            color: mode('light.accent', 'dark.accent')(props)
                        },
                        _placeholder: {
                            color: mode('light.placehoder', 'dark.placeholder')(props)
                        }
                    }
                })
            }
        },
        Spinner: {
            defaultProps: {
                variant: 'solid'
            },
            variants: {
                solid: (props) => ({
                    width: '1vw',
                    height: '1vw',
                    color: mode('light.accent', 'dark.accent')(props)
                }),
                highlight: (props) => ({
                    width: '1vw',
                    height: '1vw',
                    color: mode('light.highlight', 'dark.highlight')(props)
                }),
                caption: (props) => ({
                    width: '1vw',
                    height: '1vw',
                    color: mode('light.accent', 'dark.accent')(props)
                })
            }
        }
    },
    styles: {
        global: (props) => ({
            body: {
                bg: mode('light.base', 'dark.base')(props),
                transition: 'background .3s ease'
            }
        })
    }
})

export default theme