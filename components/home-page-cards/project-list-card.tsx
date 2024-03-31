import cn from 'classnames';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { HomePageCard } from '../stateless/card';
import FullSizeButton from './full-size-button';
import { ProjectListSchema } from '../../lib/notion-api-client';
import * as gtag from '../../lib/gtag.client';

export default function ProjectListCard({ projects }: { projects: ProjectListSchema[] }) {
  return <HomePageCard>
    <h3 className='self-center text-lg'>🕹️ Projects</h3>
    <div className='h-[1px] bg-secondary-reallight my-4' />
    <div className='flex flex-col gap-3'>
      {projects.map(project => <ProjectItem key={project.id} project={project} />)}
    </div>
    <FullSizeButton href="/projects" value={'Explore all projects'} />
  </HomePageCard>
}

const ProjectItem: React.FC<{ project: ProjectListSchema }> = ({ project }) => {
  const router = useRouter();
  const onClick = () => {
    if (project.url) {
      if (window && project?.url?.startsWith('http')) {
        return window.open(project.url, '_blank')
      }
      router.push(project.url);
      gtag.event('click on project preview', { label: project.name, value: project.url });
    }
  };

  return (<div className={cn('flex flex-row gap-3', project.url ? 'cursor-pointer' : '')} onClick={project.url ? onClick : undefined}>
    <div className='flex-shrink-0 self-center'>
      {project.page_icon ? <Image alt="Project page icon" className='rounded-lg' src={project.page_icon} width={60} height={60} />
        : <div className='text-6xl'>
          {project.page_emoji || "🧸"}
        </div>}
    </div>
    <div>
      <h5>{project?.name}</h5>
      <p className='text-sm text-secondary'>
        {project?.previewDesc}
      </p>
    </div>
  </div>)
}
