import React, { useState } from 'react'
import styles from './PatientLogin.module.css'

interface PatientLoginProps {
  onLogin: (credentials: { cpf: string; password: string }) => void
}

export const PatientLogin: React.FC<PatientLoginProps> = ({ onLogin }) => {
  const [cpf, setCpf] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const formatCPF = (value: string) => {
    const numbers = value.replace(/\D/g, '')
    if (numbers.length <= 11) {
      return numbers
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
    }
    return value
  }

  const handleCPFChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCPF(e.target.value)
    setCpf(formatted)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    // Validação básica
    const cpfNumbers = cpf.replace(/\D/g, '')
    if (cpfNumbers.length !== 11) {
      setError('CPF inválido')
      setLoading(false)
      return
    }

    if (password.length < 6) {
      setError('Senha deve ter no mínimo 6 caracteres')
      setLoading(false)
      return
    }

    try {
      // Simular chamada de API
      await new Promise(resolve => setTimeout(resolve, 1000))
      onLogin({ cpf: cpfNumbers, password })
    } catch (err) {
      setError('Erro ao fazer login. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.loginCard}>
        <div className={styles.header}>
          <h2>Área do Paciente</h2>
          <p>Acesse seus exames e laudos</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="cpf">CPF</label>
            <input
              id="cpf"
              type="text"
              value={cpf}
              onChange={handleCPFChange}
              placeholder="000.000.000-00"
              maxLength={14}
              required
              className={styles.input}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password">Senha</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Digite sua senha"
              required
              className={styles.input}
            />
          </div>

          {error && (
            <div className={styles.error}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className={styles.button}
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>

          <div className={styles.footer}>
            <a href="#" className={styles.link}>Esqueci minha senha</a>
            <a href="#" className={styles.link}>Primeiro acesso?</a>
          </div>
        </form>

        <div className={styles.info}>
          <p>
            <strong>Dúvidas?</strong> Entre em contato:
          </p>
          <p>
            📞 (44) 3361-3464<br />
            📧 legnani@oftavitta.com.br
          </p>
        </div>
      </div>
    </div>
  )
}
