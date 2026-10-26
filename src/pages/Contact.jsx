import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from '../components/ui/Breadcrumb';
import Modal from '../components/ui/Modal';

const MAX_MESSAGE_LENGTH = 500;
const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10MB

export default function Contact() {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    asunto: '',
    pedido: '',
    mensaje: '',
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [fileError, setFileError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isChatActive, setIsChatActive] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    setFileError('');
    if (!file) {
      setSelectedFile(null);
      return;
    }
    if (file.size > MAX_FILE_SIZE_BYTES) {
      setFileError('El archivo supera el máximo de 10 MB.');
      setSelectedFile(null);
      e.target.value = '';
      return;
    }
    setSelectedFile(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData({
      nombre: '',
      apellido: '',
      email: '',
      telefono: '',
      asunto: '',
      pedido: '',
      mensaje: '',
    });
    setSelectedFile(null);

    setTimeout(() => {
      setSubmitted(false);
    }, 3000);
  };

  const handleCopyEmail = (e) => {
    e.preventDefault();
    navigator.clipboard?.writeText('soporte@respawnstore.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const breadcrumbItems = [
    { label: 'Inicio', path: '/' },
    { label: 'Centro de Ayuda', path: '/ayuda' },
    { label: 'Soporte' },
  ];

  return (
    <>
      <div className="page-hero">
        <Breadcrumb items={breadcrumbItems} />
        <h1>Soporte</h1>
        <p>
          Completa el formulario a continuación y nuestro equipo de soporte se
          pondrá en contacto contigo lo antes posible.
        </p>
      </div>

      <section className="contacto-layout">
        <div className="contacto-form-wrap">
          <h2 className="contacto-titulo">Formulario de Contacto</h2>

          <form className="contacto-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="nombre">NOMBRE</label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  placeholder="ej. Sergio"
                  required
                  value={formData.nombre}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="apellido">APELLIDO</label>
                <input
                  type="text"
                  id="apellido"
                  name="apellido"
                  placeholder="ej. Rocca"
                  required
                  value={formData.apellido}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="email">CORREO ELECTRÓNICO</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Sergio@ejemplo.com"
                required
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="telefono">TELÉFONO</label>
              <input
                type="tel"
                id="telefono"
                name="telefono"
                placeholder="+51 9xx xxx xxx"
                required
                value={formData.telefono}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="asunto">ASUNTO</label>
              <select
                id="asunto"
                name="asunto"
                required
                value={formData.asunto}
                onChange={handleInputChange}
              >
                <option value="">Seleccione un tema</option>
                <option value="Consulta sobre mi pedido">
                  Consulta sobre mi pedido
                </option>
                <option value="Problema con un producto">
                  Problema con un producto
                </option>
                <option value="Devolución o cambio">
                  Devolución o cambio
                </option>
                <option value="Consulta sobre pagos">
                  Consulta sobre pagos
                </option>
                <option value="Otro">Otro</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="pedido">
                NÚMERO DE PEDIDO{' '}
                <span className="form-opcional">(opcional)</span>
              </label>
              <input
                type="text"
                id="pedido"
                name="pedido"
                placeholder="ej. RS-2026-00123"
                value={formData.pedido}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="mensaje">MENSAJE</label>
              <textarea
                id="mensaje"
                name="mensaje"
                rows="6"
                maxLength={MAX_MESSAGE_LENGTH}
                placeholder="Describe tu problema con el mayor detalle posible..."
                required
                value={formData.mensaje}
                onChange={handleInputChange}
              ></textarea>
              <div className="form-contador">
                <span id="contador">{formData.mensaje.length}</span> /{' '}
                {MAX_MESSAGE_LENGTH}
              </div>
            </div>

            <div className="form-group">
              <label>
                ADJUNTAR ARCHIVO{' '}
                <span className="form-opcional">(opcional)</span>
              </label>
              <div className="form-dropzone">
                <i className="ti ti-paperclip" aria-hidden="true"></i>
                <div className="dropzone-texto">
                  {selectedFile ? selectedFile.name : 'Arrastra archivos aquí'}
                </div>
                <div className="dropzone-sub">
                  O haz clic · PNG, JPG, PDF – máx. 10 MB
                </div>
                <input
                  type="file"
                  name="archivo"
                  accept=".png,.jpg,.pdf"
                  onChange={handleFileChange}
                  aria-label="Adjuntar archivo"
                />
              </div>
              {fileError && (
                <div style={{ color: '#ff4d6d', fontSize: '12px', marginTop: '4px' }}>
                  {fileError}
                </div>
              )}
            </div>

            <button
              type="submit"
              className="btn-primary contacto-btn"
              disabled={submitted}
            >
              {submitted ? '¡Mensaje enviado!' : 'Enviar mensaje'}
            </button>
            <p className="contacto-legal">
              Al enviar aceptas nuestra{' '}
              <a
                href="#privacidad"
                id="link-privacidad"
                onClick={(e) => {
                  e.preventDefault();
                  setIsPrivacyOpen(true);
                }}
              >
                Política de Privacidad
              </a>
            </p>
          </form>
        </div>

        <aside className="contacto-sidebar">
          <div className="sidebar-card">
            <div className="sidebar-card-titulo">OTROS CANALES</div>
            <div className="sidebar-canal">
              <i className="ti ti-phone"></i>
              <div>
                <div className="sidebar-canal-nombre">Teléfono</div>
                <div className="sidebar-canal-detalle">+51 900 000 000</div>
                <table className="sidebar-horario">
                  <tbody>
                    <tr>
                      <td>Lun – Vie</td>
                      <td>9:00 – 18:00</td>
                    </tr>
                    <tr>
                      <td>Sábado</td>
                      <td>9:00 – 13:00</td>
                    </tr>
                    <tr>
                      <td>Domingo</td>
                      <td className="cerrado">Cerrado</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="sidebar-card">
            <div className="sidebar-canal">
              <i className="ti ti-message"></i>
              <div>
                <div className="sidebar-canal-nombre">
                  Chat en vivo
                  <span className="sidebar-online">
                    <span className="online-dot"></span>
                    En línea
                  </span>
                </div>
                <div className="sidebar-canal-detalle">
                  Un agente disponible te responde en menos de 5 minutos.
                </div>
                <button
                  type="button"
                  className="btn-primary sidebar-btn"
                  onClick={() => {
                    setIsChatActive(true);
                    setTimeout(() => setIsChatActive(false), 3000);
                  }}
                >
                  {isChatActive ? 'Iniciando chat...' : 'Iniciar chat'}
                </button>
              </div>
            </div>
          </div>

          <div className="sidebar-card">
            <div className="sidebar-canal">
              <i className="ti ti-mail"></i>
              <div>
                <div className="sidebar-canal-nombre">Email directo</div>
                <div className="sidebar-canal-detalle">
                  soporte@respawnstore.com
                </div>
                <div className="sidebar-canal-detalle">
                  Te respondemos en menos de 24 horas hábiles.
                </div>
                <a
                  href="#copiar"
                  id="copiar-correo"
                  className="sidebar-link"
                  onClick={handleCopyEmail}
                >
                  {copiedEmail ? '¡Copiado!' : 'Copiar correo →'}
                </a>
              </div>
            </div>
          </div>

          <div className="sidebar-card sidebar-tip">
            <div className="sidebar-canal">
              <i className="ti ti-bulb"></i>
              <div>
                <div className="sidebar-canal-nombre">¿Sabías que...?</div>
                <div className="sidebar-canal-detalle">
                  El 80% de nuestras consultas se resuelven directamente en las
                  Preguntas Frecuentes. ¡Pruébalo antes de escribirnos!
                </div>
                <Link to="/ayuda/preguntas-frecuentes" className="sidebar-link">
                  Ver Preguntas Frecuentes →
                </Link>
              </div>
            </div>
          </div>
        </aside>
      </section>

      <Modal
        isOpen={isPrivacyOpen}
        onClose={() => setIsPrivacyOpen(false)}
        title="Política de Privacidad"
      >
        <p>
          En Respawn Store valoramos tu privacidad. Esta política explica qué
          datos recopilamos cuando usas este formulario y cómo los utilizamos, de
          acuerdo con la{' '}
          <strong>
            Ley N°29733 de Protección de Datos Personales del Perú
          </strong>
          .
        </p>

        <h3>¿Qué datos recopilamos?</h3>
        <p>
          Al enviar este formulario, recopilamos tu nombre, correo electrónico,
          teléfono, número de pedido (si lo proporcionas) y el contenido de tu
          mensaje.
        </p>

        <h3>¿Para qué los usamos?</h3>
        <p>
          Usamos tu información únicamente para responder tu consulta y darle
          seguimiento. No la usamos para publicidad ni la compartimos con
          terceros.
        </p>

        <h3>¿Por cuánto tiempo los guardamos?</h3>
        <p>
          Conservamos tus datos por un máximo de 12 meses desde tu última
          interacción con nosotros.
        </p>

        <h3>¿Cuáles son tus derechos?</h3>
        <p>
          Puedes solicitar acceso, corrección o eliminación de tus datos en
          cualquier momento. Escríbenos a{' '}
          <strong>soporte@respawnstore.com</strong> con el asunto &quot;Datos
          personales&quot; y te respondemos en 48 horas hábiles.
        </p>

        <button
          type="button"
          className="btn-primary modal-aceptar"
          onClick={() => setIsPrivacyOpen(false)}
        >
          Entendido
        </button>
      </Modal>
    </>
  );
}

